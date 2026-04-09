import numpy as np
import pickle
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

np.random.seed(42)

def make_samples(n, ear_range, frame_range, movement_range, label):
    ear = np.random.uniform(*ear_range, n)
    frames = np.random.uniform(*frame_range, n)
    mov = np.random.uniform(*movement_range, n)
    return np.column_stack([ear, frames, mov]), np.full(n, label)

# Generate synthetic data
X_awake, y_awake = make_samples(400, (0.28, 0.45), (0, 3), (0, 2), "AWAKE")
X_drowsy, y_drowsy = make_samples(300, (0.15, 0.27), (15, 40), (0, 6), "DROWSY")
X_fainted, y_fainted = make_samples(200, (0.05, 0.20), (20, 60), (10, 30), "FAINTED")

X = np.vstack([X_awake, X_drowsy, X_fainted])
y = np.concatenate([y_awake, y_drowsy, y_fainted])

# Pipeline
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("svm", SVC(kernel="rbf", probability=True))
])

pipeline.fit(X, y)

with open("svm_drowsiness_model.pkl", "wb") as f:
    pickle.dump(pipeline, f)

print("Model trained & saved as svm_drowsiness_model.pkl")