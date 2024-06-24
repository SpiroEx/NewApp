from classes.Developer import Developer


class Constants:
    DEVELOPER = Developer.get("Tim")
    FIGMA_KEY = "jlXiOtMnrJDZAYpnp017QU"
    TITLE = "Title"

    SVG_TEMP_DIR = "svg_temp/"
    BG_ICON = "bg_icon"

    def SVG_TARGET_DIR(component_name: str):
        return f"components/custom/{component_name}.tsx"
