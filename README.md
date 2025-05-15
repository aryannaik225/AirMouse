# 🖐️ AirMouse

**AirMouse** is a gesture-based virtual mouse that lets you control your computer using just your hands.
No hardware, no controllers - just your **webcam** and **gestures**.

<div align="center" width="100%">
  <a href="https://github.com/aryannaik225/AirMouse" target="_blank">
    <img src="https://github.com/aryannaik225/React-Portfolio/blob/main/assets/view-button.svg" alt="Visit Site">  
  </a>
</div>

---

## 🎥 Demo Video

[▶️ Watch the Demo](https://www.youtube.com/watch?v=KQqHYK_NVYY)

---

## ✨ Features

- 🎯 **Cursor Control** – Move your cursor with your index finger  
- 👆 **Left Click** – Thumb + Ring Finger gesture  
- 🖕 **Right Click** – Thumb + Middle Finger gesture  
- 🤏 **Drag Mode** – Thumb + Index Finger (with improved logic)  
- 🎨 **Drawing Mode** – Toggle with Thumb + Pinky; draw using Thumb + Index Finger  
- 🖱️ **Scroll** – Left Hand Middle Finger gesture  
- 🔊 **Volume Control** – Left Hand Index Finger gesture  
- 🤟 **Toggle Tracking** – "Yo" gesture to pause/resume hand tracking  
- 🖼️ **Real-time Webcam Feed** – With gesture overlays  
- 🏗️ **Lightweight UI** – Glassy minimal interface with system tray support  
- 🧠 **Automatic screen size calibration**

---

## 🔽 Download AirMouse

<div align="center" width="100%">
  <a href="https://github.com/aryannaik225/AirMouse" target="_blank">
    <img src="https://github.com/aryannaik225/React-Portfolio/blob/main/assets/view-button.svg" alt="Visit Site">  
  </a>
</div>

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/AirMouse.git
cd airmouse_source
```

### 2. Install Dependencies
Make sure you have Python 3.9+ installed.
```bash
pip install -r requirements.txt
```

### 3. Run the App
```bash
python airmouse_right_hand.py
```
or
```bash
python airmouse_left_hand.py
```

Or, if you're using the `.exe` version - just double-click to launch

---

## 📦 Technologies Used

- Python
- MediaPipe – for hand tracking
- OpenCV – for webcam feed + visual overlays
- PyAutoGUI – for mouse & keyboard control
- PyQt6 / PySide6 – for UI
- Nuitka – for building the `.exe`

---

## 🛠️ Setup Notes
- Works best in well-lit environments
- Recommended webcam: 720p or better
- Test on screens between 13" to 27" for optimal gesture zones

---

## 📘 User Manual
[📄 Download the User Manual]()

---

## 🧠 Behind the Gestures

| Action          | Gesture                                           | Hand Used |
| --------------- | ------------------------------------------------- | --------- |
| Move Cursor     | Index Finger Point                                | Right     |
| Left Click      | Thumb + Ring Finger                               | Right     |
| Right Click     | Thumb + Middle Finger                             | Right     |
| Drag Mode       | Thumb + Index Finger (distance < 60px)            | Right     |
| Drawing Toggle  | Thumb + Pinky Up (others down)                    | Right     |
| Draw Action     | Pinch Thumb + Index Finger                        | Right     |
| Scroll          | Middle Finger Up (others down)                    | Left      |
| Volume Control  | Index Finger Up (others down)                     | Left      |
| Toggle Tracking | "Yo" 🤟 Gesture (Thumb + Index + Pinky)           | Any       |

---

## 🤝 Contribution
Wanna help improve AirMouse?
- Fork the repo
- Create your branch
- Commit changes
- Open a Pull Request

---

## 📩 Feedback / Issues
Found a bug? Have a feature request?
Open an issue or reach out!

---

## 🧾 License
This project is licensed under the MIT License — see the LICENSE file for details.

---

## 🙌 Credits
Made with ❤️ by Aryan Naik
Icons and visuals powered by MediaPipe, OpenCV, and the open-source community.
