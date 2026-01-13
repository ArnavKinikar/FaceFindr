from deepface import DeepFace
import cv2

img = cv2.imread("test.jpeg")

embeddings = DeepFace.represent(
    img_path=img,
    model_name="ArcFace",
    detector_backend="retinaface",
    enforce_detection=True
)

embedding_vector = embeddings[0]["embedding"]
print(len(embedding_vector))  # usually 512
