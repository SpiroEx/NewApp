import json
import os
import subprocess
from dataclasses import dataclass
from rich import print
from classes.Constants import Constants
from classes.FigmaHelper import FigmaHelper
from classes.FileHelper import FileHelper
from classes.GithubHelper import GithubHelper
from classes.LoadingHelper import LoadingHelper
from classes.MetadataHelper import MetadataHelper
from classes.PageHelper import PageHelper
from classes.ReadmeHelper import ReadmeHelper
from classes.Rich import Rich
from classes.SVGConverter import SVGConverter
from classes.ChatGPT import ChatGPT


@dataclass
class Automate:
    @Rich.wrap
    def init():
        #! GET INPUT
        # figma_url = Rich.ask("Enter Figma URL")
        # title = Rich.ask("Enter Title")
        # about_prompt = Rich.ask("What is the web app about")
        constants = json.loads(FileHelper.read("utils/constants_temp.txt"))
        figma_url: str = constants["figma_url"]
        title: str = constants["title"]
        about_prompt: str = constants["about"]
        use_firebase: bool = constants["use_firebase"]
        firebase_config: str = constants["firebase_config"]
        use_hosting: bool = constants["use_hosting"]
        use_signin: bool = constants["use_signin"]
        use_register: bool = constants["use_register"]
        use_fcm: bool = constants["use_fcm"]
        vapid_key: str = constants["vapid_key"]
        use_functions: bool = constants["use_functions"]
        use_storage: bool = constants["use_storage"]
        use_t_and_c: bool = constants["use_t_and_c"]
        t_and_c: str = constants["t_and_c"]

        #! INSTALL
        FigmaHelper.set_key(figma_url)
        Automate.set_title(title)
        Automate.about(about_prompt)
        Automate.npm_install()
        Automate.randomize_loading()
        Automate.import_figma()
        Automate.create_repo(title)

        # TODO: replace rope_name in README.md

    @Rich.info(":rocket: Installing npm dependencies...")
    def npm_install():
        subprocess.run(["npm", "install", "--no-audit", "--no-fund"], shell=True)

    @Rich.info(":rocket: Converting SVG files to React components...")
    def svg_convert():
        SVGConverter.convert()

    @Rich.info(":rocket: Importing Figma...")
    def import_figma():
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
    def set_title(title: str):
        MetadataHelper.set_title(title)

    @Rich.info(":rocket: Generating about...")
    def about(prompt: str):
        MetadataHelper.set_about(prompt)
