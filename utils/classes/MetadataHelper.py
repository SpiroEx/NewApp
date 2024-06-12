from classes.ChatGPT import ChatGPT
from classes.ConstantsTs import ConstantsTs
from classes.ConstantsPy import ConstantsPy
from classes.FileHelper import FileHelper
from classes.ManifestJson import ManifestJson
from classes.ReadmeHelper import ReadmeHelper
from classes.Rich import Rich


class MetadataHelper:

    @staticmethod
    def set_title(title: str) -> str:
        #! Constants.py
        ConstantsPy.set_title(title)

        #! README.md
        ReadmeHelper.set_title(title)

        #! Constants.ts
        ConstantsTs.set_title(title)
        title1, title2 = ConstantsTs.get_title_parts(title)
        ConstantsTs.set_title1(title1)
        ConstantsTs.set_title2(title2)

        #! manifest.json
        ManifestJson.set_name(title)
        ManifestJson.set_short_name(title)

    def set_about(prompt: str):
        about = ChatGPT.chat(f"Create a very very short About for my website. {prompt}")

        #! README.md
        ReadmeHelper.set_about(about)
