from classes.FileHelper import FileHelper
from classes.Rich import Rich


class MetadataHelper:
    def set_title() -> str:
        #! Get Title
        title: str = Rich.ask("Enter Title")

        #! Constants.py
        FileHelper.replace_substring(
            "utils/classes/Constants.py",
            r'TITLE = "([^"]*)"',
            f'TITLE = "{title}"',
        )

        #! README.md
        FileHelper.replace_substring(
            "README.md",
            r"# Title: (.*)\n",
            f"# Title: {title}\n",
        )

        #! Constants.ts
        FileHelper.replace_substring(
            "classes/Constants.ts",
            r'ProjTitle: "(.*)",',
            f'ProjTitle: "{title}",',
        )

        if " " in title:
            title1 = title.split(" ")[0]
            title2 = " ".join(title.split(" ")[1:])
        else:
            title1 = title
            title2 = ""

        FileHelper.replace_substring(
            "classes/Constants.ts",
            r'ProjTitle1: "(.*)",',
            f'ProjTitle1: "{title1}",',
        )

        FileHelper.replace_substring(
            "classes/Constants.ts",
            r'ProjTitle2: "(.*)",',
            f'ProjTitle2: "{title2}",',
        )

        #! manifest.json
        FileHelper.replace_substring(
            "public/manifest.json",
            r'"name": "(.*)",',
            f'"name": "{title}",',
        )
        FileHelper.replace_substring(
            "public/manifest.json",
            r'"short_name": "(.*)",',
            f'"short_name": "{title}",',
        )

        return title
