import cv2
import mediapipe as mp
import pyautogui
import numpy as np

# Initializing MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=1,             # We'll track only one hand (right hand preferred)
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)
mp_draw = mp.solutions.drawing_utils

# Get screen size for scaling
screen_w, screen_h = pyautogui.size()

# Open webcam
cap = cv2.VideoCapture(0)

# Optional: set camera resolution (depends on your webcam)
frame_w, frame_h = 640, 480
cap.set(3, frame_w)
cap.set(4, frame_h)

print("[INFO] Starting AirMouse - Phase 1")

prev_x, prev_y = 0, 0
smoothing = 7  # Higher = smoother, but less responsive

while True:
    success, img = cap.read()
    if not success:
        break

    # Flip for natural movement
    img = cv2.flip(img, 1)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Draw landmarks on the hand
            mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # Extract landmark for index fingertip (id=8)
            lm_list = hand_landmarks.landmark
            index_finger = lm_list[8]

            # Convert to screen coordinates
            x_px = int(index_finger.x * frame_w)
            y_px = int(index_finger.y * frame_h)

            # Define region of interest (ROI) in webcam
            roi_x1, roi_x2 = 100, frame_w - 100
            roi_y1, roi_y2 = 100, frame_h - 100

            # Clamp index finger coordinates to ROI
            x_px = np.clip(x_px, roi_x1, roi_x2)
            y_px = np.clip(y_px, roi_y1, roi_y2)

            # Recalculate screen position using ROI instead of whole frame
            screen_x = np.interp(x_px, [roi_x1, roi_x2], [0, screen_w])
            screen_y = np.interp(y_px, [roi_y1, roi_y2], [0, screen_h])

            # Draw a circle on fingertip
            cv2.circle(img, (x_px, y_px), 10, (0, 255, 0), cv2.FILLED)

            curr_x = prev_x + (screen_x - prev_x) / smoothing
            curr_y = prev_y + (screen_y - prev_y) / smoothing

            # Move mouse
            pyautogui.moveTo(curr_x, curr_y)

            prev_x, prev_y = curr_x, curr_y

    # Show webcam feed
    cv2.imshow("AirMouse - Phase 1", img)

    # Press 'q' to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
