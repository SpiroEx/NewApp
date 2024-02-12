import subprocess
from enum import Enum


class AutoFormatFileType(Enum):
    TYPESCRIPT = 1
    PYTHON = 2


def autoformat_file(file_path: str, type=AutoFormatFileType.TYPESCRIPT) -> None:
    try:
        if type == AutoFormatFileType.PYTHON:
            subprocess.run(["black", file_path], check=True)
        elif type == AutoFormatFileType.TYPESCRIPT:
            subprocess.run(f"npx prettier --write {file_path}", shell=True)

        print(f"File {file_path} formatted successfully.")
    except subprocess.CalledProcessError:
        print(f"Error: Failed to format {file_path}.")


if __name__ == "__main__":
    autoformat_file("app/firebase.ts")
