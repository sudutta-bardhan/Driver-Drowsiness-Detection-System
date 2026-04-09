import cv2
import mediapipe as mp
import numpy as np
import time
import pickle
from flask import Flask, jsonify
from flask_cors import CORS
from threading import Thread

# ---------------- CONFIG ----------------
EAR_THRESHOLD = 0.25
FRAME_LIMIT = 15
FAINT_TIME = 10
MODEL_PATH = "svm_drowsiness_model.pkl"

# ---------------- FLASK SETUP ----------------
app = Flask(__name__)
CORS(app)

current_status = "AWAKE"
current_confidence = 1.0

@app.route("/", methods=["GET"])
def home():
    return "ML service running"

@app.route("/status", methods=["GET"])
def get_status():
    return jsonify({
        "status": current_status,
        "confidence": current_confidence
    })

def run_flask():
    app.run(port=5001)  # PORT

# ---------------- LOAD MODEL ----------------
try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    use_ml = True
    print("ML model loaded")
except:
    model = None
    use_ml = False
    print("ML model NOT found, using rule-based system")

# ---------------- VARIABLES ----------------
eye_closed_frames = 0
last_movement_time = time.time()
confidence = 1.0

# ---------------- FUNCTIONS ----------------
def calculate_EAR(eye):
    A = np.linalg.norm(eye[1] - eye[5])
    B = np.linalg.norm(eye[2] - eye[4])
    C = np.linalg.norm(eye[0] - eye[3])
    return (A + B) / (2.0 * C)

def detect(EAR):
    global eye_closed_frames, last_movement_time, confidence

    elapsed = time.time() - last_movement_time

    if EAR < EAR_THRESHOLD:
        eye_closed_frames += 1
    else:
        eye_closed_frames = 0
        last_movement_time = time.time()
        elapsed = 0

    if use_ml:
        features = np.array([[EAR, float(eye_closed_frames), elapsed]])
        status = model.predict(features)[0]
        confidence = float(np.max(model.predict_proba(features)[0]))
        return status

    confidence = 1.0
    if eye_closed_frames > FRAME_LIMIT:
        return "DROWSY"
    if elapsed > FAINT_TIME:
        return "FAINTED"
    return "AWAKE"

# ---------------- MEDIAPIPE SETUP ----------------
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    refine_landmarks=True)

LEFT_EYE = [33,160,158,133,153,144]
RIGHT_EYE = [362,385,387,263,373,380]

cap = cv2.VideoCapture(0)

# ---------------- START FLASK THREAD ----------------
Thread(target=run_flask, daemon=True).start()

print("ML Service Started on http://localhost:5001")

# ---------------- MAIN LOOP ----------------
while True:
    ret, frame = cap.read()
    if not ret:
        print("Camera not detected")
        break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb)

    status = "AWAKE"

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            h, w, _ = frame.shape

            left_eye, right_eye = [], []

            for idx in LEFT_EYE:
                lm = face_landmarks.landmark[idx]
                left_eye.append([int(lm.x*w), int(lm.y*h)])

            for idx in RIGHT_EYE:
                lm = face_landmarks.landmark[idx]
                right_eye.append([int(lm.x*w), int(lm.y*h)])

            left_eye = np.array(left_eye)
            right_eye = np.array(right_eye)

            EAR = (calculate_EAR(left_eye) + calculate_EAR(right_eye)) / 2
            status = detect(EAR)

    # GLOBAL UPDATE
    current_status = status
    current_confidence = confidence

    print(f"Status: {current_status}, Confidence: {current_confidence:.2f}")

    time.sleep(0.03)

cap.release()