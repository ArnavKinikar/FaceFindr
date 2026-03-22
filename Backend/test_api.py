import requests
import os

BASE_URL = "http://localhost:8000"
TEST_IMAGE_PATH = "images/testing/test3.png" # Will verify this exists

def test_root():
    try:
        r = requests.get(f"{BASE_URL}/")
        print(f"GET /: {r.status_code}")
        print(r.json())
        assert r.status_code == 200
    except Exception as e:
        print(f"Root endpoint failed: {e}")

def test_upload():
    if not os.path.exists(TEST_IMAGE_PATH):
        print(f"Test image not found at {TEST_IMAGE_PATH}")
        return

    try:
        with open(TEST_IMAGE_PATH, "rb") as f:
            files = {"file": f}
            r = requests.post(f"{BASE_URL}/upload", files=files)
            
        print(f"POST /upload: {r.status_code}")
        if r.status_code == 200:
            data = r.json()
            print("Response keys:", data.keys())
            print(f"Matches found: {len(data.get('matches', []))}")
            print(f"All photos returned: {len(data.get('all', []))}")
        else:
            print(r.text)
    except Exception as e:
        print(f"Upload endpoint failed: {e}")

if __name__ == "__main__":
    test_root()
    test_upload()
