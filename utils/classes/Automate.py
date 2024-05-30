import os
import subprocess
from dataclasses import dataclass

from classes.Constants import Constants
from classes.FigmaHelper import FigmaHelper
from classes.GithubHelper import GithubHelper
from classes.LoadingHelper import LoadingHelper
from classes.MetadataHelper import MetadataHelper
from classes.PageHelper import PageHelper
from classes.Rich import Rich
from classes.SVGConverter import SVGConverter


@dataclass
class Automate:
    @Rich.wrap
    def init():
        Automate.npm_install()
        Automate.randomize_loading()
        Automate.import_figma()
        title = Automate.set_title()
        Automate.create_repo(title)

    @Rich.info(":rocket: Installing npm dependencies...")
    def npm_install():
        subprocess.run(["npm", "install", "--no-audit", "--no-fund"], shell=True)

    @Rich.info(":rocket: Installing pip requirements")
    def pip_install():
        subprocess.check_call(["python", "-m", "venv", "utils/venv"], shell=True)
        subprocess.check_call(
            ["utils/venv/Scripts/pip", "install", "-r", "utils/requirements.txt"]
        )
        subprocess.check_call(["call", "utils/venv/Scripts/activate"], shell=True)

        Rich.success("PLEASE RESTART YOUR TERMINAL TO APPLY VENV")

    @Rich.info(":rocket: Converting SVG files to React components...")
    def svg_convert():
        SVGConverter.convert()

    @Rich.info(":rocket: Importing Figma...")
    def import_figma():
        FigmaHelper.set_key()
        FigmaHelper.get_colors()
        FigmaHelper.get_svg()
        SVGConverter.convert()
        FigmaHelper.get_icons()

    @Rich.info(":rocket: Adding page...")
    def add_page():
        PageHelper.add_page()

    @Rich.info(":rocket: Removing page...")
    def remove_page():
        PageHelper.remove_page()

    @Rich.info(":rocket: Randomizing loading animation...")
    def randomize_loading():
        LoadingHelper.randomize()

    @Rich.info(":rocket: Creating GitHub repo...")
    def create_repo(title=""):
        if title == "" and Constants.TITLE == "":
            title = Automate.set_title()
        GithubHelper.create_repo(title)

    @Rich.info(":rocket: Setting title...")
    def set_title() -> str:
        title = MetadataHelper.set_title()
        return title
