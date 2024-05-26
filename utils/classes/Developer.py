from classes.FileHelper import FileHelper


class Developer:
    def __init__(self, name: str, figma_token: str):
        self.name = name
        self.figma_token = figma_token

    def set_developer():
        developer = input("Who will develop this website [Tim/Job]? ")
        while developer not in developers.keys():
            print(f"Error: No developer named {developer}")
            developer = input("Who will develop this website [Tim/Job]? ")

        FileHelper.replace_substring(
            "utils/src/constants.py",
            r'DEVELOPER = developers\["([^"]+)"\]',
            f'DEVELOPER = developers["{developer}"]',
        )

        FileHelper.replace_substring(
            "utils/src/constants.py",
            r'FIGMA_TOKEN = "([^"]+)"',
            f'FIGMA_TOKEN = "{developers[developer].figma_token}"',
        )

    def get_all():
        return developers

    def get(name: str):
        return developers[name]


developers = {
    "Tim": Developer("Tim", "figd_fJPzLo-pDYO8xKht6za5rjqba6sLWkh8VuGA-dS5"),
    "Job": Developer("Job", "TODO---"),
}
