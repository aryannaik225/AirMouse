import cv2
import mediapipe as mp
import pyautogui
import numpy as np
import math
import time

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)
mp_draw = mp.solutions.drawing_utils

# Screen size
screen_w, screen_h = pyautogui.size()

# Webcam
cap = cv2.VideoCapture(0)
frame_w, frame_h = 640, 480
cap.set(3, frame_w)
cap.set(4, frame_h)

# Smoothing
prev_x, prev_y = 0, 0
smoothing = 7

# Region of Interest
roi_x1, roi_x2 = 100, frame_w - 100
roi_y1, roi_y2 = 100, frame_h - 100

click_cooldown = 0  # Timestamp to prevent multiple clicks

print("[INFO] AirMouse Phase 2 - Cursor & Click")
click_start_time = None  # Timestamp for click duration
click_registered = False  # Flag to check if click was registered

while True:
    success, img = cap.read()
    if not success:
        break

    img = cv2.flip(img, 1)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            lm_list = hand_landmarks.landmark

            # Index fingertip
            x8 = int(lm_list[8].x * frame_w)
            y8 = int(lm_list[8].y * frame_h)

            # Thumb tip
            x4 = int(lm_list[4].x * frame_w)
            y4 = int(lm_list[4].y * frame_h)

            # Draw hand landmarks
            mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # Clamp within ROI
            x8_clamped = np.clip(x8, roi_x1, roi_x2)
            y8_clamped = np.clip(y8, roi_y1, roi_y2)

            # Map to screen coords
            screen_x = np.interp(x8_clamped, [roi_x1, roi_x2], [0, screen_w])
            screen_y = np.interp(y8_clamped, [roi_y1, roi_y2], [0, screen_h])

            # Smooth cursor movement
            curr_x = prev_x + (screen_x - prev_x) / smoothing
            curr_y = prev_y + (screen_y - prev_y) / smoothing
            pyautogui.moveTo(curr_x, curr_y)
            prev_x, prev_y = curr_x, curr_y

            # Draw pointer
            cv2.circle(img, (x8, y8), 10, (0, 255, 0), cv2.FILLED)

            # Calculate Euclidean distance between thumb and index fingertip
            distance = math.hypot(x4 - x8, y4 - y8)

            # Show visual feedback
            cv2.line(img, (x4, y4), (x8, y8), (0, 0, 255), 2)
            cv2.circle(img, ((x4 + x8)//2, (y4 + y8)//2), 6, (0, 0, 255), cv2.FILLED)

            # Register click only if fingers are very close
            if distance < 28:
                if not click_registered:
                    if click_start_time is None:
                        click_start_time = time.time()

                    elif time.time() - click_start_time > 0.2:
                        pyautogui.click()
                        click_registered = True

            else:
                click_start_time = None
                click_registered = False



    # Show webcam feed
    cv2.imshow("AirMouse - Phase 2", img)

    # Exit on 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
