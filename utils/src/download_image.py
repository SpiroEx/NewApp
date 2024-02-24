import requests
import os


def download_image(url, file_path):
    file_name = os.path.basename(file_path)
    try:
        response = requests.get(url)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            with open(file_path, "wb") as file:
                file.write(response.content)
            print(f"Image '{file_name}' downloaded.")
        else:
            print(
                f"Failed to download image '{file_name}'. Status code:",
                response.status_code,
            )
    except Exception as e:
        print(f"Failed to download image '{file_name}'. Error:", e)
