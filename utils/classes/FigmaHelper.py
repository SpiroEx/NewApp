import re
from typing import List, NamedTuple, Optional
from classes.Constants import Constants
from classes.FileHelper import FileHelper
import requests


class FigmaColor(NamedTuple):
    name: str
    r: float
    g: float
    b: float
    a: Optional[float] = 1.0


class FigmaHelper:
    def clickable(name: str):
        return name.startswith("!")

    def _get_rgba(key: str, token: str, ids: str) -> FigmaColor:
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
            raise Exception(
                f"Error getting color {ids} in figma: {response.status_code}"
            )

    def _rgb_to_hex_rgba(color: FigmaColor) -> str:
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

    def get_colors():
        #! DELETE OLD CUSTOM COLORS
        FileHelper.replace_substring(
            "tailwind.config.js",
            r"        // custom - from Figma((?!\}).|\n)*},",
            r"        // custom - from Figma\n\n      },",
        )

        #! GET NEW CUSTOM COLORS
        url = f"https://api.figma.com/v1/files/{Constants.FIGMA_KEY}"
        headers = {"X-Figma-Token": Constants.FIGMA_TOKEN}
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Error getting colors in figma: {response.status_code}")

        json_data = response.json()
        styles = json_data["styles"]

        #! APPEND NEW CUSTOM COLORS
        color_lines: List[str] = []

        for ids in styles.keys():
            figma_color = FigmaHelper._get_rgba(
                Constants.FIGMA_KEY, Constants.FIGMA_TOKEN, ids
            )
            name = figma_color.name
            color = FigmaHelper._rgb_to_hex_rgba(figma_color)
            print(f"{name}: {color}")
            color_lines.append(f"        {name}: '{color}',")

        FileHelper.append_in(
            "tailwind.config.js", "        // custom - from Figma\n", color_lines
        )

    def set_key():
        url = input("Enter Figma URL: ")

        #! Extract ID from Figma URL
        pattern = r"https://www\.figma\.com/file/([a-zA-Z0-9_-]+)/.*"

        # Search for the pattern in the URL
        match = re.match(pattern, url)

        # If a match is found, return the extracted ID
        if match:
            key = match.group(1)
        else:
            raise Exception("Invalid Figma URL")

        print(f"FIGMA KEY: {key}")

        FileHelper.replace_substring(
            "utils/src/constants.py",
            r'FIGMA_KEY = "([^"]+)"',
            f'FIGMA_KEY = "{key}"',
        )
