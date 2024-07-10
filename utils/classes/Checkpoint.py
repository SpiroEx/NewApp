import json
import os
from typing import Callable


class Checkpoint:

    def __init__(self, filepath: str) -> None:
        self.filepath = filepath
        self.value = self.read()

    def read(self) -> int:
        try:
            with open(self.filepath, "r") as file:
                return json.loads(file.read())["checkpoint"]

        except FileNotFoundError:
            return 0

    def write(self, value: int):
        try:
            with open(self.filepath, "r") as file:
                data = json.loads(file.read())
                data["checkpoint"] = value

        except FileNotFoundError:
            data = {"checkpoint": value}

        with open(self.filepath, "w") as file:
            file.write(json.dumps(data))

    def step(self, x: int, func: Callable, *args, **kwargs):
        if self.value < x:
            func(*args, **kwargs)
            self.write(x)
