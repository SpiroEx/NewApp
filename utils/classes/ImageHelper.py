import os

import requests

from PIL import Image


class ImageHelper:
    def download(url: str, file_path: str):
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

    def resize(input_image: str, output_image: str, size: tuple):
        original_image = Image.open(input_image)
        resized_image = original_image.resize(size)
        resized_image.save(output_image)

    def png_to_favicon(input_image: str, output_image: str, size=48):
        original_image = Image.open(input_image)
        original_image.save(output_image, format="ICO", sizes=[(size, size)])
