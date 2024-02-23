import requests
import json
from typing import NamedTuple, Optional, Dict, List
from src.append_lines_in_file import append_lines_in_file
from src.constants import Constants


def import_colors():

    styles = get_colors(Constants.FIGMA_KEY, Constants.FIGMA_TOKEN)

    color_lines: List[str] = []

    for ids in styles.keys():
        figma_color = get_rgba(Constants.FIGMA_KEY, Constants.FIGMA_TOKEN, ids)
        name = figma_color.name
        color = rgb_to_hex_rgba(figma_color)
        print(f"{name}: {color}")
        color_lines.append(f"        {name}: '{color}',")

    append_lines_in_file(
        "tailwind.config.js", "        // custom - from Figma\n", color_lines
    )


class FigmaColor(NamedTuple):
    name: str
    r: float
    g: float
    b: float
    a: Optional[float] = 1.0


def get_rgba(key: str, token: str, ids: str) -> FigmaColor:
    url = f"https://api.figma.com/v1/files/{key}/nodes?ids={ids}"
    headers = {
        "X-Figma-Token": token,
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        json_data = response.json()
        # print(json_data)
        name = json_data["nodes"][ids]["document"]["name"]
        color = json_data["nodes"][ids]["document"]["fills"][0]["color"]
        return FigmaColor(**color, name=name)
    else:
        print(f"Error getting color {ids} in figma: {response.status_code}")
        raise Exception(f"Error getting color {ids} in figma: {response.status_code}")


def get_colors(key: str, token: str) -> Dict:
    url = f"https://api.figma.com/v1/files/{key}"
    headers = {
        "X-Figma-Token": token,
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        json_data = response.json()
        return json_data["styles"]
    else:
        print(f"Error getting colors in figma: {response.status_code}")
        raise Exception(f"Error getting colors in figma: {response.status_code}")


def rgb_to_hex_rgba(color: FigmaColor) -> str:
    # Check if all components are valid
    if not all(
        0 <= component <= 1 for component in (color.r, color.g, color.b, color.a)
    ):
        raise ValueError("Color components must be in range [0, 1]")

    # Convert color components to integers in range [0, 255]
    r = int(round(color.r * 255))
    g = int(round(color.g * 255))
    b = int(round(color.b * 255))
    a = int(round(color.a * 255)) if color.a else 255

    # Convert each component to its two-digit hexadecimal representation
    hex_components = [f"{component:02x}" for component in (r, g, b, a)]

    # check if last two digits are FF, if so, remove them
    if hex_components[3] == "ff":
        hex_components.pop()

    # Combine components and prefix with "#" to form the hex RGBA string
    return f"#{''.join(hex_components).upper()}"


if __name__ == "__main__":
    import_colors()
