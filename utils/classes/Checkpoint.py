import json
import os


class Checkpoint:
    @staticmethod
    def read() -> int:
        try:
            with open("utils/data.txt", "r") as file:
                return json.loads(file.read())["checkpoint"]

        except FileNotFoundError:
            return 0

    @staticmethod
    def write(checkpoint: int):
        with open("utils/data.txt", "r") as file:
            data = json.loads(file.read())
            data["checkpoint"] = checkpoint

        with open("website/utils/data.txt", "w") as file:
            file.write(json.dumps(data))
