import requests

files = [
    ('files', ('test3.png', open(r'e:\\Projects\\FaceFindr\\images\\testing\\test3.png', 'rb'), 'image/png'))
]

try:
    response = requests.post('http://localhost:8000/admin/upload', files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
