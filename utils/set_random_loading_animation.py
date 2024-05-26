# TODO
import random

from classes.FileHelper import FileHelper


def set_random_loading_animation():
    loading_animation = random.choice(loading_animations)
    FileHelper.replace_substring(
        "app/templates/LoadingPage.tsx",
        r'import\s*{\s*([^}\s]+)\s*}\s*from\s*"react-spinners";',
        f'import {{ {loading_animation} }} from "react-spinners";',
    )

    FileHelper.replace_substring(
        "app/templates/LoadingPage.tsx",
        r'{!hideIcon && \(\s*<([^>\s]+)\s*color={`\${getColor\("loading_icon"\)}`}',
        f'{{!hideIcon && (\n        <{loading_animation}\n          color={{`${{getColor\("loading_icon"\)}}`}}',
    )


loading_animations = [
    "BarLoader",
    "BeatLoader",
    "BounceLoader",
    "CircleLoader",
    "ClimbingBoxLoader",
    "ClipLoader",
    "ClockLoader",
    "DotLoader",
    "FadeLoader",
    "GridLoader",
    "HashLoader",
    "MoonLoader",
    "PacmanLoader",
    "PropagateLoader",
    "PulseLoader",
    "PuffLoader",
    "RingLoader",
    "RiseLoader",
    "RotateLoader",
    "ScaleLoader",
    "SkewLoader",
    "SquareLoader",
    "SyncLoader",
]


if __name__ == "__main__":
    set_random_loading_animation()
