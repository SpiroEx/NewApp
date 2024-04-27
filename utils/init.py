from classes.rich import Rich
from classes.automate import Automate
import click


@click.group(invoke_without_command=True)
@click.pass_context
def cli(ctx: click.Context):
    if ctx.invoked_subcommand is None:
        init()
    else:
        pass


@cli.command()
# @click.option("--count", default=1, help="Number of greetings.")
# @click.option("--name", prompt="Your name", help="The person to greet.")
def init():
    """Automate creation of website"""
    Automate.init()


@cli.command()
def npm_install():
    """Run npm install"""
    Automate.npm_install()


@cli.command()
def pip_install():
    """Run pip install"""
    Automate.pip_install()


if __name__ == "__main__":
    cli()
