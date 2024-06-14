import json
import os
import subprocess
from dataclasses import dataclass
from rich import print
from classes.Constants import Constants
from classes.ConstantsTs import ConstantsTs
from classes.EnvLocalHelper import EnvLocalHelper
from classes.FigmaHelper import FigmaHelper
from classes.FileHelper import FileHelper
from classes.FirebaseHelper import FirebaseHelper
from classes.FirebaseJson import FirebaseJson
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

        #! FIGMA KEY / TITLE / ABOUT
        FigmaHelper.set_key(figma_url)
        Automate.set_title(title)
        Automate.about(about_prompt)

        #! USE FIREBASE
        Automate.set_use_firebase(use_firebase)
        if use_firebase:
            Automate.firebase_config(firebase_config)
            Automate.firebase_id(firebase_config)

        #! USE HOSTING / SIGN IN / REGISTER
        Automate.set_use_hosting(use_hosting)
        Automate.set_use_sign_in(use_signin)
        Automate.set_use_register(use_register)

        #! USE FCM
        Automate.set_use_fcm(use_fcm)
        if use_fcm:
            Automate.set_vapid_key(vapid_key)

        #! USE FUNCTIONS / STORAGE
        Automate.set_use_functions(use_functions)
        Automate.set_use_storage(use_storage)

        #! USE T&C
        Automate.set_use_t_and_c(use_t_and_c)
        if use_t_and_c:
            Automate.set_t_and_c(t_and_c)

        #! INSTALL DEPENDENCIES
        Automate.npm_install()

        #! RANDOMIZE LOADING
        Automate.randomize_loading()

        #! IMPORT FIGMA
        Automate.import_figma()

        #! CREATE GITHUB REPO
        Automate.create_repo(title)

        # TODO: replace repo_name in README.md

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

    @Rich.info(":rocket: Setting Firebase config...")
    def firebase_config(firebase_config: str):
        EnvLocalHelper.set_firebase_config(firebase_config)

    @Rich.info(":rocket: Setting Firebase ID...")
    def firebase_id(firebase_config: str):
        EnvLocalHelper.set_firebase_id(firebase_config)

    @Rich.info(":rocket: Setting useFirebase...")
    def set_use_firebase(use_firebase: bool):
        ConstantsTs.set_use_firebase(use_firebase)

    @Rich.info(":rocket: Setting useHosting...")
    def set_use_hosting(use_hosting: bool):
        if use_hosting:
            url = FirebaseHelper.get_url()
            ReadmeHelper.set_link(url)

        else:
            ReadmeHelper.delete_link()

    @Rich.info(":rocket: Setting useSignin...")
    def set_use_sign_in(use_sign_in: bool):
        ConstantsTs.set_use_sign_in(use_sign_in)

    @Rich.info(":rocket: Setting useRegister...")
    def set_use_register(use_register: bool):
        ConstantsTs.set_use_register(use_register)

    @Rich.info(":rocket: Setting useFCM...")
    def set_use_fcm(use_fcm: bool):
        ConstantsTs.set_use_fcm(use_fcm)

    @Rich.info(":rocket: Setting VAPID key...")
    def set_vapid_key(vapid_key: str):
        ConstantsTs.set_vapid_key(vapid_key)

    @Rich.info(":rocket: Setting useFunctions...")
    def set_use_functions(use_functions: bool):
        FirebaseJson.set_functions(use_functions)

    @Rich.info(":rocket: Setting useStorage...")
    def set_use_storage(use_storage: bool):
        FirebaseJson.set_storage(use_storage)

    @Rich.info(":rocket: Setting useT&C...")
    def set_use_t_and_c(use_t_and_c: bool):
        ConstantsTs.set_use_t_and_c(use_t_and_c)

    @Rich.info(":rocket: Setting T&C...")
    def set_t_and_c(t_and_c: str):
        ConstantsTs.set_t_and_c(t_and_c)
