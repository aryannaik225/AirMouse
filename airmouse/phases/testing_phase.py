import cv2
import mediapipe as mp
import pyautogui
import numpy as np
import math
import time
import keyboard
import psutil
import os

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
  max_num_hands=1,
  min_detection_confidence=0.7,
  min_tracking_confidence=0.7
)
mp_draw = mp.solutions.drawing_utils

screen_w, screen_h = pyautogui.size()

cap = cv2.VideoCapture(0)
frame_w, frame_h = 640, 480
cap.set(3, frame_w)
cap.set(4, frame_h)
cap.set(10, 150)  # Brightness

prev_x, prev_y = 0, 0
smoothing = 7

roi_x1, roi_x2 = 100, frame_w - 100
roi_y1, roi_y2 = 100, frame_h - 100

airmouse_active = True
yo_start_time = None
yo_held = False

left_click_cooldown = 0
right_click_cooldown = 0
drag_cooldown = 0


left_click_start_time = None
left_click_registered = False

right_click_start_time = None
right_click_registered = False

drag_start_time = None
drag_registered = False
dragging = False


print("[INFO] AirMouse Phase 4 - Now Toggleable with Gesture + Keybind (Ctrl + Shift + A)")

while True:
  success, img = cap.read()
  if not success:
    break

  img = cv2.flip(img, 1)
  img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  results = hands.process(img_rgb)

  if keyboard.is_pressed('ctrl+shift+a'):
    airmouse_active = not airmouse_active
    print(f"[KEYBIND] AirMouse {'Activated' if airmouse_active else 'Deactivated'}")
    time.sleep(1)  # Prevents multiple toggles in a short time

  if results.multi_hand_landmarks:
    for hand_landmarks in results.multi_hand_landmarks:
      lm_list = hand_landmarks.landmark

      x4, y4 = int(lm_list[4].x * frame_w), int(lm_list[4].y * frame_h) # Thumb tip
      x8, y8 = int(lm_list[8].x * frame_w), int(lm_list[8].y * frame_h) # Index finger tip
      x12, y12 = int(lm_list[12].x * frame_w), int(lm_list[12].y * frame_h) # Middle finger tip
      x16, y16 = int(lm_list[16].x * frame_w), int(lm_list[16].y * frame_h) # Ring finger tip
      x20, y20 = int(lm_list[20].x * frame_w), int(lm_list[20].y * frame_h) # Pinky tip

      mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)


      # Check fingers up/down
      def is_finger_up(tip_id):
        return lm_list[tip_id].y < lm_list[tip_id - 2].y

      def is_thumb_up():
        # Check if thumb tip is far from the palm base (wrist), mostly on X-axis
        thumb_tip = lm_list[4]
        thumb_ip = lm_list[3]
        wrist = lm_list[0]
        dx = abs(thumb_tip.x - wrist.x)
        dy = abs(thumb_tip.y - wrist.y)
        return dx > dy and dx > 0.1  # adjust threshold if needed



      index_up = is_finger_up(8)
      pinky_up = is_finger_up(20)
      middle_down = not is_finger_up(12)
      ring_down = not is_finger_up(16)
      thumb_up = is_thumb_up()

      yo_sign = index_up and pinky_up and thumb_up and middle_down and ring_down


      if yo_sign:
        if not yo_held:
          yo_start_time = time.time()
          yo_held = True
        elif time.time() - yo_start_time > 0.8:
          airmouse_active = not airmouse_active
          print(f"[GESTURE] AirMouse {'Activated' if airmouse_active else 'Deactivated'}")
          yo_held = False
          time.sleep(1)
      else:
        yo_start_time = None
        yo_held = False


      if airmouse_active:
        # Setting Index finger tip as cursor position
        x8_clamped = np.clip(x8, roi_x1, roi_x2)
        y8_clamped = np.clip(y8, roi_y1, roi_y2)

        srceen_x = np.interp(x8_clamped, [roi_x1, roi_x2], [0, screen_w])
        screen_y = np.interp(y8_clamped, [roi_y1, roi_y2], [0, screen_h])
        curr_x = prev_x + (srceen_x - prev_x) / smoothing
        curr_y = prev_y + (screen_y - prev_y) / smoothing
        pyautogui.moveTo(curr_x, curr_y)
        prev_x, prev_y = curr_x, curr_y

        cv2.circle(img, (x8, y8), 10, (0, 255, 0), cv2.FILLED)


        # Left Click -> Thumb and middle finger pinch
        dist_left_click = math.hypot(x4 - x12, y4 - y12) # Calculating the euclidean distance between thumb and middle finger
        cv2.line(img, (x4, y4), (x12, y12), (0, 0, 255), 2)
        cv2.circle(img, ((x4 + x12)//2, (y4 + y12)//2), 6, (0, 0, 255), cv2.FILLED)

        if dist_left_click < 28:
          if not left_click_registered:
            if left_click_start_time is None:
              left_click_start_time = time.time()

            elif time.time() - left_click_start_time > 0.5:

              # Calculate Latency 
              gesture_detected_at = left_click_start_time
              action_triggered_at = time.time()
              latency = action_triggered_at - gesture_detected_at
              print(f"[LATENCY] Left Click Latency: {latency * 1000:.2f} ms")

              pyautogui.click()
              left_click_registered = True
        else:
          left_click_start_time = None
          left_click_registered = False


        # Right Click -> Thumb and ring finger pinch
        dist_right_click = math.hypot(x4 - x16, y4 - y16) # Calculating the euclidean distance between thumb and ring finger
        
        if dist_right_click < 28:
          if not right_click_registered:
            if right_click_start_time is None:
              right_click_start_time = time.time()

            elif time.time() - right_click_start_time > 0.5:

              # Calculate Latency
              gesture_detected_at = right_click_start_time
              action_triggered_at = time.time()
              latency = action_triggered_at - gesture_detected_at
              print(f"[LATENCY] Right Click Latency: {latency * 1000:.2f} ms")

              pyautogui.click(button='right')
              right_click_registered = True
        else:
          right_click_start_time = None
          right_click_registered = False

        
        # Drag -> Thumb and index finger pinch
        dist_drag = math.hypot(x4 - x8, y4 - y8)

        if dist_drag < 28:
          if not drag_registered:
            if drag_start_time is None:
              drag_start_time = time.time()

            elif time.time() - drag_start_time > 0.5:

              # Calculate Latency
              gesture_detected_at = drag_start_time
              action_triggered_at = time.time()
              latency = action_triggered_at - gesture_detected_at
              print(f"[LATENCY] Drag Start Latency: {latency * 1000:.2f} ms")

              dragging = True
              pyautogui.mouseDown()
              drag_registered = True
              print("[DEBUG] Drag Start")
        else:
          drag_start_time = None
          drag_registered = False
          if dragging:
            pyautogui.mouseUp()
            dragging = False
            print("[DEBUG] Drag End")

  # --- Performance Monitoring ---
  process = psutil.Process(os.getpid())
  print(f"CPU: {process.cpu_percent()}%, RAM: {process.memory_info().rss / 1024 ** 2:.2f} MB")

  cv2.imshow("AirMouse - Phase 4", img)

  # Exit on 'q'
  if cv2.waitKey(1) & 0xFF == ord('q'):
    break

cap.release()
cv2.destroyAllWindows()