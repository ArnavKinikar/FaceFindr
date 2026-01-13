import cv2
from deepface import DeepFace

# Load image
img = cv2.imread("test.jpeg")

# DeepFace expects BGR (OpenCV default), so no color conversion needed

# Detect faces + generate embeddings
faces = DeepFace.represent(
    img_path=img,
    model_name="ArcFace",
    detector_backend="retinaface",
    enforce_detection=True
)

print("Faces detected:", len(faces))

for i, face in enumerate(faces):
    bbox = face["facial_area"]   # dict: x, y, w, h
    embedding = face["embedding"]

    print(
        f"Face {i}: "
        f"bbox=({bbox['x']}, {bbox['y']}, {bbox['w']}, {bbox['h']}), "
        f"emb_shape=({len(embedding)},)"
    )
