import os
import re
from typing import Callable, Dict, List, NamedTuple, Optional
from classes.Constants import Constants
from classes.FileHelper import FileHelper
import requests

from classes.ImageHelper import ImageHelper
from classes.Rich import Rich


class FigmaColor(NamedTuple):
    name: str
    r: float
    g: float
    b: float
    a: Optional[float] = 1.0


class FigmaHelper:
    key = Constants.FIGMA_KEY
    headers = {"X-Figma-Token": os.getenv("FIGMA_TOKEN")}

    def clickable(name: str):
        return name.startswith("!")

    def _get_rgba(key: str, ids: str) -> FigmaColor:
        url = f"https://api.figma.com/v1/files/{key}/nodes?ids={ids}"
        response = requests.get(url, headers=FigmaHelper.headers)
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
        url = f"https://api.figma.com/v1/files/{FigmaHelper.key}"
        response = requests.get(url, headers=FigmaHelper.headers)
        if response.status_code != 200:
            raise Exception(f"Error getting colors in figma: {response.status_code}")

        json_data = response.json()
        styles = json_data["styles"]

        #! APPEND NEW CUSTOM COLORS
        color_lines: List[str] = []

        manifest_bg = "#ffffff"

        for ids in styles.keys():
            figma_color = FigmaHelper._get_rgba(FigmaHelper.key, ids)
            name = figma_color.name
            color = FigmaHelper._rgb_to_hex_rgba(figma_color)
            print(f"{name}: {color}")
            color_lines.append(f"        {name}: '{color}',")

            if name == Constants.BG_ICON:
                manifest_bg = color

        FileHelper.append_in(
            "tailwind.config.js", "        // custom - from Figma\n", color_lines
        )

        #! manifest.json
        FileHelper.replace_substring(
            "public/manifest.json",
            r'"theme_color": "(.*)"',
            f'"theme_color": "{manifest_bg}"',
        )
        FileHelper.replace_substring(
            "public/manifest.json",
            r'"background_color": "(.*)"',
            f'"background_color": "{manifest_bg}"',
        )

    def set_key():
        url = Rich.ask("Enter Figma URL")

        #! Extract ID from Figma URL
        pattern = r"https://www\.figma\.com/design/([a-zA-Z0-9_-]+)/.*"

        # Search for the pattern in the URL
        match = re.match(pattern, url)

        # If a match is found, return the extracted ID
        if match:
            key = match.group(1)
        else:
            raise Exception("Invalid Figma URL")

        print(f"FIGMA KEY: {key}")

        FileHelper.replace_substring(
            "utils/classes/Constants.py",
            r'FIGMA_KEY = "([^"]+)"',
            f'FIGMA_KEY = "{key}"',
        )
        FigmaHelper.key = key

    def _find_component(
        dictionary: Dict, condition: Callable[[str], bool]
    ) -> List[Dict]:
        components = []

        if isinstance(dictionary, dict):
            if "name" in dictionary and condition(dictionary["name"]):
                components.append(dictionary)

            if "children" in dictionary:
                for child in dictionary["children"]:
                    components.extend(FigmaHelper._find_component(child, condition))

        return components

    def _id_name_mapping(svgs: List[Dict]) -> Dict:
        return [svg["id"] for svg in svgs], {svg["id"]: svg["name"][1:] for svg in svgs}

    def _get_dictionary():
        url = f"https://api.figma.com/v1/files/{FigmaHelper.key}"

        response = requests.get(url, headers=FigmaHelper.headers)

        if response.status_code != 200:
            raise Exception(f"Error getting svgs in figma: {response.status_code}")

        json_data = response.json()
        dictionary: Dict = json_data["document"]
        return dictionary

    def get_svg():
        #! GET NODE SVGs
        dictionary = FigmaHelper._get_dictionary()

        svgs = FigmaHelper._find_component(
            dictionary, lambda name: name.startswith("~")
        )

        #! GET IDs
        ids, id_name_mapping = FigmaHelper._id_name_mapping(svgs)

        #! GET SVG IMAGES
        url = f"https://api.figma.com/v1/images/{FigmaHelper.key}?ids={','.join(ids)}&format=svg&svg_outline_text=false"
        response = requests.get(url, headers=FigmaHelper.headers)

        if response.status_code != 200:
            raise Exception(
                f"Error getting svg images in figma: {response.status_code}"
            )

        json_data = response.json()
        images = json_data["images"]

        for id, url in images.items():
            name = id_name_mapping[id]
            ImageHelper.download(url, f"svg_temp/{name}.svg")

    def get_icons():
        dictionary = FigmaHelper._get_dictionary()

        #! GET ICONS
        circle_icon = FigmaHelper._find_component(
            dictionary, lambda name: name == "icon-circle"
        )[0]

        square_icon = FigmaHelper._find_component(
            dictionary, lambda name: name == "icon-square"
        )[0]

        screenshot = FigmaHelper._find_component(
            dictionary, lambda name: name == "Main"
        )[0]

        circle_icon_id = circle_icon["id"]
        square_icon_id = square_icon["id"]
        screenshot_id = screenshot["id"]

        #! GET ICON PNG IMAGES
        url = f"https://api.figma.com/v1/images/{FigmaHelper.key}?ids={circle_icon_id},{square_icon_id},{screenshot_id}&format=png"
        response = requests.get(url, headers=FigmaHelper.headers)

        if response.status_code != 200:
            raise Exception(
                f"Error getting icon images in figma: {response.status_code}"
            )

        json_data = response.json()
        images = json_data["images"]

        ImageHelper.download(images[circle_icon_id], f"public/images/icons/icon.png")

        ImageHelper.download(images[screenshot_id], f"public/images/screenshot.png")

        ImageHelper.download(
            images[square_icon_id], f"public/images/icons/maskable_icon_x512.png"
        )

        other_sizes = [48, 72, 96, 128, 192, 384]

        for size in other_sizes:
            ImageHelper.resize(
                "public/images/icons/maskable_icon_x512.png",
                f"public/images/icons/maskable_icon_x{size}.png",
                (size, size),
            )

        #! Apple touch icon
        ImageHelper.resize(
            "public/images/icons/maskable_icon_x512.png",
            "public/images/icons/apple-touch-icon.png",
            (180, 180),
        )

        #! Favicon
        ImageHelper.png_to_favicon(
            "public/images/icons/icon.png",
            "public/images/favicon.ico",
        )
