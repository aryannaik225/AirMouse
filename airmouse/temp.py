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

# Cursor smoothing
prev_x, prev_y = 0, 0
smoothing = 7

# ROI for cursor area
roi_x1, roi_x2 = 100, frame_w - 100
roi_y1, roi_y2 = 100, frame_h - 100

# Gesture state locks
left_click_locked = False
right_click_locked = False
drag_locked = False
click_cooldown_time = 0  # seconds
last_click_time = time.time()

print("[INFO] AirMouse Phase 3 - Cursor, Click, Right Click, Drag")

while True:
    success, img = cap.read()
    if not success:
        break

    img = cv2.flip(img, 1)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            lm = hand_landmarks.landmark

            # Convert landmarks to pixel positions
            x4, y4 = int(lm[4].x * frame_w), int(lm[4].y * frame_h)    # Thumb tip
            x8, y8 = int(lm[8].x * frame_w), int(lm[8].y * frame_h)    # Index tip
            x12, y12 = int(lm[12].x * frame_w), int(lm[12].y * frame_h) # Middle tip
            x16, y16 = int(lm[16].x * frame_w), int(lm[16].y * frame_h) # Ring tip

            # Draw landmarks
            mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # ---- Cursor Movement (Index Finger) ----
            x8_clamped = np.clip(x8, roi_x1, roi_x2)
            y8_clamped = np.clip(y8, roi_y1, roi_y2)
            screen_x = np.interp(x8_clamped, [roi_x1, roi_x2], [0, screen_w])
            screen_y = np.interp(y8_clamped, [roi_y1, roi_y2], [0, screen_h])
            curr_x = prev_x + (screen_x - prev_x) / smoothing
            curr_y = prev_y + (screen_y - prev_y) / smoothing
            pyautogui.moveTo(curr_x, curr_y)
            prev_x, prev_y = curr_x, curr_y
            cv2.circle(img, (x8, y8), 10, (0, 255, 0), cv2.FILLED)

            # ---- Drag Mode (Thumb + Index Hold) ----
            dist_drag = math.hypot(x4 - x8, y4 - y8)
            if dist_drag < 28:
                if not drag_locked:
                    pyautogui.mouseDown()
                    drag_locked = True
                    print("[DEBUG] Drag Start")
                cv2.line(img, (x4, y4), (x8, y8), (255, 140, 0), 3)
            elif drag_locked:
                pyautogui.mouseUp()
                drag_locked = False
                print("[DEBUG] Drag End")

            # ---- Left Click (Thumb + Middle) ----
            dist_left_click = math.hypot(x4 - x12, y4 - y12)
            if dist_left_click < 28:
                if not left_click_locked and (time.time() - last_click_time) > click_cooldown_time:
                    pyautogui.click()
                    left_click_locked = True
                    last_click_time = time.time()
                    print("[DEBUG] Left Click")
                cv2.line(img, (x4, y4), (x12, y12), (0, 0, 255), 3)
            else:
                left_click_locked = False

            # ---- Right Click (Thumb + Ring) ----
            dist_right_click = math.hypot(x4 - x16, y4 - y16)
            if dist_right_click < 28:
                if not right_click_locked and (time.time() - last_click_time) > click_cooldown_time:
                    pyautogui.rightClick()
                    right_click_locked = True
                    last_click_time = time.time()
                    print("[DEBUG] Right Click")
                cv2.line(img, (x4, y4), (x16, y16), (0, 255, 255), 3)
            else:
                right_click_locked = False

    # Show webcam feed
    cv2.imshow("AirMouse - Phase 3", img)

    # Exit on 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
