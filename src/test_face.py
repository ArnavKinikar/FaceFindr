import cv2
from insightface.app import FaceAnalysis

app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=-1)

img = cv2.imread("Friends.jpg")
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

faces = app.get(img)
print("Faces detected:", len(faces))

for i, face in enumerate(faces):
    print(f"Face {i}: bbox={face.bbox}, emb_shape={face.embedding.shape}")
