from classes.FileHelper import FileHelper


class ConstantsPy:
    @staticmethod
    def _replace(old: str, new: str):
        FileHelper.replace_substring(
            "utils/classes/Constants.py",
            old,
            new,
        )

    @staticmethod
    def set_title(title: str):
        ConstantsPy._replace(
            r'TITLE = "([^"]*)"',
            f'TITLE = "{title}"',
        )

    @staticmethod
    def set_figma_key(key: str):
        ConstantsPy._replace(
            r'FIGMA_KEY = "([^"]+)"',
            f'FIGMA_KEY = "{key}"',
        )
