from src.replace_substring_in_file import replace_substring_in_file
from src.developer import developers


def set_developer():
    developer = input("Who will develop this website [Tim/Job]? ")
    while developer not in developers.keys():
        print(f"Error: No developer named {developer}")
        developer = input("Who will develop this website [Tim/Job]? ")

    replace_substring_in_file(
        "utils/src/constants.py",
        r'DEVELOPER = developers\["([^"]+)"\]',
        f'DEVELOPER = developers["{developer}"]',
    )

    replace_substring_in_file(
        "utils/src/constants.py",
        r'FIGMA_TOKEN = "([^"]+)"',
        f'FIGMA_TOKEN = "{developers[developer].figma_token}"',
    )


if __name__ == "__main__":
    set_developer()
