import re


def replace_substring_in_file(
    file_path: str, old_substring_pattern: str, new_substring: str
) -> None:
    """
    Replace old_substring with new_substring in the file located at file_path.
    """
    try:
        with open(file_path, "r") as file:
            file_data = file.read()

        # Replace the old substring with the new one
        new_file_data = re.sub(old_substring_pattern, new_substring, file_data)

        with open(file_path, "w") as file:
            file.write(new_file_data)

    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
        raise FileNotFoundError()
