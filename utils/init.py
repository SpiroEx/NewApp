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
def add_page():
    """Add Website Page"""
    Automate.add_page()


@cli.command()
def remove_page():
    """Remove Website Page"""
    Automate.remove_page()


@cli.command()
def randomize_loading():
    """Randomize Loading Animation"""
    Automate.randomize_loading()


@cli.command()
def create_repo():
    """Create Github Repo"""
    Automate.create_repo()


@cli.command()
def set_title():
    """Set Website Title"""
    Automate.set_title()


if __name__ == "__main__":
    cli()
