import json, numpy as np
print(np.load("data/face_embeddings.npy").shape)
print(len(json.load(open("data/face_metadata.json"))))