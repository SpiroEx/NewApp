import re
from src.replace_substring_in_file import replace_substring_in_file


def set_figma_key():

    key = get_key()
    while key == "":
        print("\nError: Invalid link\n")
        key = get_key()

    print(f"FIGMA KEY: {key}")

    replace_substring_in_file(
        "utils/src/constants.py",
        r'FIGMA_KEY = "([^"]+)"',
        f'FIGMA_KEY = "{key}"',
    )


def get_key():
    link = input("Enter Figma link: ")
    return extract_id_from_figma_url(link)


def extract_id_from_figma_url(url: str) -> str:
    # Define the pattern to search for the ID
    pattern = r"https://www\.figma\.com/file/([a-zA-Z0-9_-]+)/.*"

    # Search for the pattern in the URL
    match = re.match(pattern, url)

    # If a match is found, return the extracted ID
    if match:
        return match.group(1)
    else:
        return ""


if __name__ == "__main__":
    set_figma_key()
