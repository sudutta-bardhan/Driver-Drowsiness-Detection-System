# 🚗 Driver Drowsiness Detection System

A full-stack, real-time driver drowsiness detection application that uses machine learning and computer vision to monitor driver alertness and trigger alerts when signs of drowsiness are detected — helping prevent road accidents caused by fatigue.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Driver Drowsiness Detection System** is a real-time safety application that analyzes facial cues (such as eye closure and head position) through a webcam feed to determine if a driver is becoming drowsy. When drowsiness is detected, the system triggers an audible/visual alert to wake the driver and prevent potential accidents.

The project is structured as a three-tier architecture:
- **Machine Learning** – Model training and inference
- **Backend** – API server handling detection logic and communication
- **Frontend** – User interface for live monitoring and alerts

---

## ✨ Features

- 🎥 **Real-time webcam monitoring** of the driver's face
- 👁️ **Eye aspect ratio (EAR)** based drowsiness detection
- 🔔 **Instant alert system** when drowsiness is detected
- 📊 **Live dashboard** displaying driver status and metrics
- 🧠 **ML-powered inference** using a trained deep learning model
- 🌐 **Full-stack web application** accessible via browser

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | TypeScript, HTML, CSS |
| **Backend** | TypeScript / Node.js |
| **Machine Learning** | Python, OpenCV, Deep Learning |
| **Communication** | REST API / WebSocket |

---

## 📁 Project Structure

```
Driver-Drowsiness-Detection-System/
│
├── Frontend/          # TypeScript-based UI for live monitoring & alerts
│
├── Backend/           # Node.js/TypeScript API server
│
└── MachineLearning/   # Python scripts for model training and inference
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- [Python](https://www.python.org/) (v3.8 or above)
- `pip` (Python package manager)
- `npm` or `yarn`
- A working **webcam**

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/sudutta-bardhan/Driver-Drowsiness-Detection-System.git
cd Driver-Drowsiness-Detection-System
```

#### 2. Set up the Machine Learning module

```bash
cd MachineLearning
pip install -r requirements.txt
```

#### 3. Set up the Backend

```bash
cd ../Backend
npm install
```

#### 4. Set up the Frontend

```bash
cd ../Frontend
npm install
```

---

### Running the Application

#### Start the ML inference server

```bash
cd MachineLearning
python app.py
```

#### Start the Backend server

```bash
cd Backend
npm run dev
```

#### Start the Frontend

```bash
cd Frontend
npm run dev
```

Then open your browser and navigate to `http://localhost:3000` (or whichever port is configured).

---

## ⚙️ How It Works

1. **Video Capture** – The frontend captures a live webcam stream from the driver's camera.
2. **Frame Processing** – Frames are sent to the backend/ML module for analysis.
3. **Facial Landmark Detection** – The ML model detects facial landmarks, focusing on the eyes and head position.
4. **Drowsiness Classification** – Based on eye aspect ratio (EAR) and blink frequency, the system classifies the driver as **Alert**, **Drowsy**, or **Sleeping**.
5. **Alert Trigger** – If drowsiness is detected beyond a threshold, an alert is immediately shown/played on the dashboard.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and includes relevant documentation.

---

## 👥 Authors

- Sudutta Bardhan
- Sumanta Manna
- Suneet Kumar
- Swapnanil Laha
- Swastika Dwibedi
- Tathagata Deb
- Upahar Jana
