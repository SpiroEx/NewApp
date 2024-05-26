from classes.FileHelper import FileHelper


class Developer:
    def __init__(self, name: str):
        self.name = name

    def set_developer():
        developer = input("Who will develop this website [Tim/Job]? ")
        while developer not in developers.keys():
            print(f"Error: No developer named {developer}")
            developer = input("Who will develop this website [Tim/Job]? ")

        FileHelper.replace_substring(
            "utils/classes/Constants.py",
            r'DEVELOPER = developers\["([^"]+)"\]',
            f'DEVELOPER = developers["{developer}"]',
        )

    def get_all():
        return developers

    def get(name: str):
        return developers[name]


developers = {
    "Tim": Developer("Tim"),
    "Job": Developer("Job"),
}
