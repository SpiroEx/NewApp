from classes.FileHelper import FileHelper


class ConstantsTs:
    @staticmethod
    def _replace(old: str, new: str):
        FileHelper.replace_substring(
            "classes/Constants.ts",
            old,
            new,
        )

    @staticmethod
    def get_title_parts(title: str):
        if " " in title:
            title1 = title.split(" ")[0]
            title2 = " ".join(title.split(" ")[1:])
        else:
            title1 = title
            title2 = ""

        return title1, title2

    @staticmethod
    def set_title(title: str):
        ConstantsTs._replace(
            r'ProjTitle: "(.*)",',
            f'ProjTitle: "{title}",',
        )

    @staticmethod
    def set_title1(title1: str):
        ConstantsTs._replace(
            r'ProjTitle1: "(.*)",',
            f'ProjTitle1: "{title1}",',
        )

    @staticmethod
    def set_title2(title2: str):
        ConstantsTs._replace(
            r'ProjTitle2: "(.*)",',
            f'ProjTitle2: "{title2}",',
        )
