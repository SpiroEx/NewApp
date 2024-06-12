from typing import List
from classes.FileHelper import FileHelper


class TailwindConfig:
    @staticmethod
    def _replace(old: str, new: str):
        FileHelper.replace_substring(
            "tailwind.config.js",
            old,
            new,
        )

    @staticmethod
    def remove_custom_colors():
        TailwindConfig._replace(
            r"        // custom - from Figma((?!\}).|\n)*},",
            r"        // custom - from Figma\n\n      },",
        )

    @staticmethod
    def add_custom_colors(color_lines: List[str]):
        FileHelper.append_in(
            "tailwind.config.js", "        // custom - from Figma\n", color_lines
        )
