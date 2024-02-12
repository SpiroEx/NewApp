from typing import List

def append_lines_in_file(
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
        raise ValueError(f"Search line '{search_line}' not found in file '{filename}'")

    if insert_after:
        lines.insert(index + 1, "\n".join(new_lines) + "\n")
    else:
        lines.insert(index, "\n".join(new_lines) + "\n")

    with open(filename, "w") as file:
        file.writelines(lines)


