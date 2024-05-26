import glob
import os
import re

from classes.AutoFormat import AutoFormat
from classes.Constants import Constants
from classes.DirectoryHelper import DirectoryHelper
from classes.FigmaHelper import FigmaHelper
from classes.FileHelper import FileHelper
from classes.Rich import Rich
from rich.progress import track


class SVGConverter:

    def convert():
        width_value = 0

        def convert_attribute(attribute: str, delimeter: str):
            parts = attribute.split(delimeter)
            return parts[0] + "".join(part.capitalize() for part in parts[1:])

        def convert_svg_to_react(svg_content: str, delimeter: str):
            regex_pattern = r"(\w+{}+\w+=)".format(re.escape(delimeter))

            attributes_to_convert = re.findall(regex_pattern, svg_content)

            for attribute in set(attributes_to_convert):
                react_attribute = convert_attribute(attribute, delimeter)
                svg_content = svg_content.replace(attribute, react_attribute)

            return svg_content

        def create_react_component(svg_content, component_name):
            return f"""
import {{ motion }} from "framer-motion";
import {{ MouseEventHandler }} from "react";

interface {component_name}Props {{
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}}

const {component_name}: React.FC<{component_name}Props> = ({{onClick, size={width_value}}}) => (
  {svg_content}
);

export default {component_name};
"""

        def convert_to_motion_svg(react_svg_content: str, clickable: bool):
            nonlocal width_value

            motion_str = "<motion.svg onClick={onClick}"
            if clickable:
                motion_str += (
                    " className='select-none cursor-pointer' whileTap={{ scale: 0.8 }}"
                )
            else:
                motion_str += " className='select-none'"

            modified_string = react_svg_content.replace(
                "<svg",
                motion_str,
            ).replace("</svg>", "</motion.svg>")

            #! GET WIDTH
            width_wild_pattern = r'width="(\d+)"'
            width_match = re.search(width_wild_pattern, modified_string)
            # Check if a match is found
            if width_match:
                # Access the matched group (XX in this case)
                width_value = width_match.group(1)
                # print(f'The width value is: {width_value}')
            else:
                print("No width match found")

            #! REPLACE WIDTH
            width_replacement_string = "width={size}"
            modified_string = re.sub(
                width_wild_pattern, width_replacement_string, modified_string, count=1
            )

            height_wild_pattern = r'height="(\d+)"'
            height_replacement_string = ""
            modified_string = re.sub(
                height_wild_pattern, height_replacement_string, modified_string, count=1
            )

            return modified_string

        def convert_style_to_jsx(html_string: str):
            pattern = r'style="(.*?)"'
            matches = re.findall(pattern, html_string)

            # Replace each style attribute with JSX-compatible style
            for match in matches:
                jsx_style = match_to_jsx(match)
                html_string = html_string.replace(
                    f'style="{match}"', f"style={{{{ {jsx_style} }}}}"
                )

            return html_string

        def match_to_jsx(match):
            # Split the style attribute into key-value pairs
            styles = match.split(";")
            jsx_style = []
            for style in styles:
                if ":" in style:
                    key, value = style.split(":")
                    # Convert key to camelCase
                    key = re.sub(r"-([a-z])", lambda m: m.group(1).upper(), key.strip())
                    key = key[0].lower() + key[1:]  # Make the first character lowercase
                    value = value.strip()
                    jsx_style.append(f'"{key}": "{value}"')

            # Join the JSX-compatible style properties
            return ", ".join(jsx_style)

        #! MAIN
        svg_files = DirectoryHelper.get_files(Constants.SVG_TEMP_DIR)
        svg_files = [file for file in svg_files if file.endswith(".svg")]

        if len(svg_files) == 0:
            Rich.print(":warning:  No SVG files", "yellow")
            return

        for i in track(range(len(svg_files)), description="Converting SVGs..."):
            svg_file = svg_files[i]

            base_name = FileHelper.base_name(svg_file)
            if base_name.startswith("~"):
                base_name = base_name[1:]

            clickable = FigmaHelper.clickable(base_name)
            if clickable:
                base_name = base_name[1:]

            component_full_dir = Constants.SVG_TARGET_DIR(base_name)

            with open(svg_file, "r") as file:
                svg_content = file.read()
                react_svg_content = convert_svg_to_react(svg_content, "-")
                react_svg_content = convert_svg_to_react(svg_content, "-")
                react_svg_content = convert_svg_to_react(svg_content, "-")
                react_svg_content = convert_svg_to_react(react_svg_content, ":")
                react_svg_content = convert_to_motion_svg(react_svg_content, clickable)
                react_svg_content = convert_style_to_jsx(react_svg_content)
                react_component = create_react_component(react_svg_content, base_name)

            with open(component_full_dir, "w") as file:
                file.write(react_component)

            AutoFormat.typescript(component_full_dir)

            try:
                os.remove(svg_file)
            except OSError as e:
                print(f"Error: {e.filename} - {e.strerror}")

        Rich.print("SVGs converted", "green")
