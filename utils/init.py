import click
from rich import print
from rich.console import Console
from rich.theme import Theme
import subprocess

custom_theme = Theme(
    {
        "info": "medium_turquoise",
        "warning": "yellow",
        "danger": "red",
        "success": "bold green",
    }
)

console = Console(theme=custom_theme)


@click.group(invoke_without_command=True)
@click.pass_context
def cli(ctx: click.Context):
    if ctx.invoked_subcommand is None:
        init()
    else:
        pass
        # click.echo(f"I am about to invoke {ctx.invoked_subcommand}")


# --------------


# console.print("Please tell me your name: ", style="info")

# name = input()


@cli.command()
# @click.option("--count", default=1, help="Number of greetings.")
# @click.option("--name", prompt="Your name", help="The person to greet.")
def init():
    """Automate creation of website"""
    # run npm run initialize
    console.print(":rocket: Installing npm dependencies...", style="info")
    subprocess.run(["npm", "install"], shell=True)
    console.print("---   ⭐ Success!   ---", style="success", justify="center")


@cli.command()
def dropdb():
    """drop the beat"""
    click.echo("Dropped the database")


if __name__ == "__main__":
    console.print(
        "---   Website Automation   ---",
        style="warning",
        justify="center",
    )

    cli()
