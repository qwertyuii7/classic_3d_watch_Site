import cv2
import os

video_path = r"c:\hackathon\watch\public\assets\watch_video\A_hyper_detailed_K_product_vi.mp4"
output_dir = r"c:\hackathon\watch\public\frames_2"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error opening video file: {video_path}")
    exit(1)

frame_idx = 0
saved_idx = 1

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Keep every 2nd frame
    if frame_idx % 2 == 0:
        height, width = frame.shape[:2]
        new_width = 1920
        new_height = int(height * (new_width / width))
        
        resized_frame = cv2.resize(frame, (new_width, new_height), interpolation=cv2.INTER_AREA)
        
        output_path = os.path.join(output_dir, f"frame_{saved_idx:03d}.jpg")
        cv2.imwrite(output_path, resized_frame, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
        
        if saved_idx % 20 == 0:
            print(f"Saved {saved_idx} frames...")
            
        saved_idx += 1
        
    frame_idx += 1

cap.release()
print(f"Finished extracting {saved_idx - 1} frames to {output_dir}")
