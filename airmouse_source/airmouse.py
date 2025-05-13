import cv2
import mediapipe as mp
import pyautogui
import numpy as np
import math
import time
import keyboard

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
  max_num_hands=2,
  min_detection_confidence=0.7,
  min_tracking_confidence=0.7
)
mp_draw = mp.solutions.drawing_utils

screen_w, screen_h = pyautogui.size()

cap = cv2.VideoCapture(0)
# frame_w, frame_h = 640, 480
# cap.set(3, frame_w)
# cap.set(4, frame_h)
cap.set(3, 1920)  # Width
cap.set(4, 1080)  # Height
frame_w, frame_h = int(cap.get(3)), int(cap.get(4))
cap.set(10, 150)  # Brightness

prev_x, prev_y = 0, 0
smoothing = 2

roi_x1, roi_x2 = 170, frame_w - 170
roi_y1, roi_y2 = 170, frame_h - 170

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

drawing_mode = False
drawing_mode_held = False
drawing_start_time = None


print("[INFO] AirMouse Gesture Based Virtual Mouse Controller")
print("[INFO] Make a 'Yo' sign to toggle AirMouse on/off")
print("[INFO] Press 'Ctrl + Shift + A' to toggle AirMouse on/off")
print("[INFO] Right Click: Pinch Thumb and Middle Finger")
print("[INFO] Left Click: Pinch Thumb and Ring Finger")
print("[INFO] Drag: Pinch Thumb and Index Finger")
print("[INFO] AirMouse is Active")
print("[INFO] Press 'q' to exit")

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

  if results.multi_hand_landmarks and results.multi_handedness:
    for hand_index, hand_landmarks in enumerate(results.multi_hand_landmarks):

      hand_label = results.multi_handedness[hand_index].classification[0].label

      if hand_label == 'Right':

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
          cv2.rectangle(img, (roi_x1, roi_y1), (roi_x2, roi_y2), (255, 255, 0), 2)

          sensitivity = 0.2  # Try 0.15 or 0.1 if it's still fast

          delta_x = (srceen_x - prev_x) * sensitivity
          delta_y = (screen_y - prev_y) * sensitivity

          curr_x = prev_x + delta_x
          curr_y = prev_y + delta_y

          if abs(delta_x) > 1 or abs(delta_y) > 1:  # Avoid micro jitter
              pyautogui.moveTo(curr_x, curr_y, duration=0)

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
                dragging = True
                pyautogui.mouseDown()
                drag_registered = True
                # print("[DEBUG] Drag Start")
          else:
            drag_start_time = None
            drag_registered = False
            if dragging and dist_drag > 60:
              pyautogui.mouseUp()
              dragging = False
              # print("[DEBUG] Drag End")



          # Drawing Toggle Gesture: Thumb + Pinky Up, Rest Down
          thumb_up_draw = is_finger_up(4)
          pinky_up_draw = is_finger_up(20)
          index_down_draw = not is_finger_up(8)
          middle_down_draw = not is_finger_up(12)
          ring_down_draw = not is_finger_up(16)

          drawing_toggle_gesture = (
              thumb_up_draw and pinky_up_draw and index_down_draw and middle_down_draw and ring_down_draw
          )

          if drawing_toggle_gesture:
            if not drawing_mode_held:
              drawing_start_time = time.time()
              drawing_mode_held = True
            elif time.time() - drawing_start_time > 0.8:
              drawing_mode = not drawing_mode
              drawing_mode_held = False
              print(f"[GESTURE] Drawing Mode {'Activated' if drawing_mode else 'Deactivated'}")
              time.sleep(1)
          else:
            drawing_start_time = None
            drawing_mode_held = False


          # Drawing Mode
          if drawing_mode:
            dist_drawing = math.hypot(x4 - x8, y4 - y8)

            if dist_drawing < 28:
              pyautogui.mouseDown()
              cv2.circle(img, ((x4 + x8)//2, (y4 + y8)//2), 10, (255, 0, 0), cv2.FILLED)
            elif dist_drawing > 28:
              pyautogui.mouseUp()

          if drawing_mode:
            cv2.putText(img, "Drawing Mode: ON", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 3)

      elif hand_label == 'Left':
        lm_list = hand_landmarks.landmark

        x8_L = int(lm_list[8].x * frame_w)
        y8_L = int(lm_list[8].y * frame_h)

        x12_L = int(lm_list[12].x * frame_w)
        y12_L = int(lm_list[12].y * frame_h)

        x16_L = int(lm_list[16].x * frame_w)
        y16_L = int(lm_list[16].y * frame_h)

        x20_L = int(lm_list[20].x * frame_w)
        y20_L = int(lm_list[20].y * frame_h)

        mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)


        def is_left_finger_up(tip_id):
          return lm_list[tip_id].y < lm_list[tip_id - 2].y

        #  Scroll Gesture: Middle finger up, Rest down
        left_middle_up = is_left_finger_up(12)
        left_index_down = not is_left_finger_up(8)
        left_ring_down = not is_left_finger_up(16)
        left_pinky_down = not is_left_finger_up(20)

        scroll_gesture = left_middle_up and left_index_down and left_ring_down and left_pinky_down

        if scroll_gesture:
          cv2.circle(img, (x12_L, y12_L), 10, (255, 255, 0), cv2.FILLED)
          
          if y12_L < frame_h // 2:
            pyautogui.scroll(100)
            cv2.putText(img, "Scrolling Up", (10, 80), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)
          elif y12_L > frame_h // 2:
            pyautogui.scroll(-100)
            cv2.putText(img, "Scrolling Down", (10, 80), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)


        # Volume Control Gesture: Index finger up, Rest down
        left_vol_index_up = is_left_finger_up(8)
        left_vol_middle_down = not is_left_finger_up(12)
        left_vol_ring_down = not is_left_finger_up(16)
        left_vol_pinky_down = not is_left_finger_up(20)

        volume_gesture = left_vol_index_up and left_vol_middle_down and left_vol_ring_down and left_vol_pinky_down

        if volume_gesture:
          cv2.circle(img, (x8_L, y8_L), 10, (0, 255, 255), cv2.FILLED)

          if y8_L < frame_h // 2:
            pyautogui.press('volumeup')
            cv2.putText(img, "Volume Up", (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
          elif y8_L > frame_h // 2:
            pyautogui.press('volumedown')
            cv2.putText(img, "Volume Down", (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)


  preview_img = cv2.resize(img, (640, 360))
  cv2.imshow("AirMouse - Gesture Based Virtual Mouse Controller", preview_img)

  # Exit on 'q'
  if cv2.waitKey(1) & 0xFF == ord('q'):
    break

cap.release()
cv2.destroyAllWindows()