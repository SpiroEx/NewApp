import os
import re
from typing import List


class FileHelper:
    def base_name(file_path: str) -> str:
        return os.path.splitext(os.path.basename(file_path))[0]

    def replace_substring(
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

    def append_in(
        filename: str,
        search_line: str,
        new_lines: List[str],
        insert_after: bool = True,
    ) -> None:
        with open(filename, "r") as file:
            lines = file.readlines()

        try:
            index = lines.index(search_line)
        except ValueError:
            raise ValueError(
                f"Search line '{search_line}' not found in file '{filename}'"
            )

        if insert_after:
            lines.insert(index + 1, "\n".join(new_lines) + "\n")
        else:
            lines.insert(index, "\n".join(new_lines) + "\n")

        with open(filename, "w") as file:
            file.writelines(lines)
