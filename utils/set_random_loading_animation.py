import random
from src.replace_substring_in_file import replace_substring_in_file


def set_random_loading_animation():
    loading_animation = random.choice(loading_animations)
    replace_substring_in_file(
        "app/templates/LoadingPage.tsx",
        r'import\s*{\s*([^}\s]+)\s*}\s*from\s*"react-spinners";',
        f'import {{ {loading_animation} }} from "react-spinners";',
    )

    replace_substring_in_file(
        "app/templates/LoadingPage.tsx",
        r"{!hideIcon && \(\s*<([^>\s]+)\s*color={`\${Colors\.darker_primary}`}",
        f"{{!hideIcon && (\n        <{loading_animation}\n          color={{`${{Colors.darker_primary}}`}}",
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
