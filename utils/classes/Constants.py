from classes.Developer import Developer


class Constants:
    DEVELOPER = Developer.get("Tim")
    FIGMA_KEY = "fW4DoJuSg3qiY6ttPZZ8jz"
    TITLE = "HelloWorld"

    SVG_TEMP_DIR = "svg_temp/"

    def SVG_TARGET_DIR(component_name: str):
        return f"components/custom/{component_name}.tsx"
