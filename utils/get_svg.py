import requests
from src.constants import Constants
from src.download_image import download_image
from typing import Dict, List


def find_objects_with_tilde(dictionary) -> List[Dict]:
    objects_with_tilde = []

    if isinstance(dictionary, dict):
        if "name" in dictionary and dictionary["name"].startswith("~"):
            objects_with_tilde.append(dictionary)

        if "children" in dictionary:
            for child in dictionary["children"]:
                objects_with_tilde.extend(find_objects_with_tilde(child))

    return objects_with_tilde


def get_svg():

    #! GET NODE SVGs
    url = f"https://api.figma.com/v1/files/{Constants.FIGMA_KEY}"
    headers = {
        "X-Figma-Token": Constants.FIGMA_TOKEN,
    }
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Error getting svgs in figma: {response.status_code}")
        raise Exception(f"Error getting svgs in figma: {response.status_code}")

    json_data = response.json()
    svgs = find_objects_with_tilde(json_data["document"])

    #! GET IDs
    ids = [svg["id"] for svg in svgs]
    id_name_mapping = {svg["id"]: svg["name"][1:] for svg in svgs}
    print(id_name_mapping)

    #! GET SVG IMAGES
    url = f"https://api.figma.com/v1/images/{Constants.FIGMA_KEY}?ids={','.join(ids)}&format=svg&svg_outline_text=false"
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Error getting svg images in figma: {response.status_code}")
        raise Exception(f"Error getting svg images in figma: {response.status_code}")

    json_data = response.json()
    images = json_data["images"]

    for id, url in images.items():
        name = id_name_mapping[id]
        download_image(url, f"svg_temp/{name}.svg")


if __name__ == "__main__":
    get_svg()
