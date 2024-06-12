from rich.console import Console, JustifyMethod
from rich.theme import Theme
from dataclasses import dataclass
from typing import Literal, Optional, Callable
from rich.prompt import Prompt

custom_theme = Theme(
    {
        "info": "medium_turquoise",
        "warning": "yellow",
        "danger": "red",
        "success": "bold green",
    }
)

console = Console(theme=custom_theme)


@dataclass
class Rich:
    @staticmethod
    def print(
        text: str,
        style: Optional[Literal["info", "warning", "danger", "success"]] = None,
        justify: Optional[JustifyMethod] = None,
    ):
        console.print(text, style=style, justify=justify)

    @staticmethod
    def welcome():
        Rich.print(
            "---   Website Automation   ---",
            style="warning",
            justify="center",
        )

    @staticmethod
    def success():
        Rich.print(
            "---   ⭐ Success!   ---",
            style="success",
            justify="center",
        )

    @staticmethod
    def error(e: Exception):
        Rich.print(
            f"---   Error: {e}   ---",
            style="danger",
            justify="center",
        )

    @staticmethod
    def wrap(func: Callable):
        def wrapper(*args, **kwargs):
            try:
                Rich.welcome()
                x = func(*args, **kwargs)
                Rich.success()
            except Exception as e:
                Rich.error(e)

        return wrapper

    @staticmethod
    def ask(text: str):
        return Prompt.ask(f"\n[chartreuse1]{text}[/chartreuse1]")

    @staticmethod
    def info(text: str):
        def decorator(func: Callable):
            def wrapper(*args, **kwargs):
                Rich.print(text, style="info")
                return func(*args, **kwargs)

            return wrapper

        return decorator
