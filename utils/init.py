from dotenv import load_dotenv

load_dotenv()
import click

from classes.Automate import Automate


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
def start():
    """Start the project"""
    Automate.start()


@cli.command()
def npm_install():
    """Run npm install"""
    Automate.npm_install()


@cli.command()
def pip_install():
    """Run pip install"""
    Automate.pip_install()


@cli.command()
def svg_convert():
    """Convert SVG files to React components"""
    Automate.svg_convert()


@cli.command()
def figma():
    """Automate Figma"""
    Automate.import_figma()


@cli.command()
@click.argument("name", type=str)
def add_page(name):
    """Add Website Page"""
    Automate.add_page(name)


@cli.command()
@click.argument("name", type=str)
def remove_page(name):
    """Remove Website Page"""
    Automate.remove_page(name)


@cli.command()
def randomize_loading():
    """Randomize Loading Animation"""
    Automate.randomize_loading()


if __name__ == "__main__":
    cli()
