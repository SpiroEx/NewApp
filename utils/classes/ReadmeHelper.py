from classes.FileHelper import FileHelper


class ReadmeHelper:
    @staticmethod
    def _replace(old: str, new: str):
        FileHelper.replace_substring(
            "README.md",
            old,
            new,
        )

    @staticmethod
    def set_title(title: str):
        ReadmeHelper._replace(r"# Title: (.*)\n", f"# Title: {title}\n")

    @staticmethod
    def set_about(about: str):
        ReadmeHelper._replace(r"{{About}}", about)

    @staticmethod
    def set_link(link: str):
        ReadmeHelper._replace(r"{link}", link)

    @staticmethod
    def delete_link():
        ReadmeHelper._replace(r"The application is currently deployed at(.*)\n", "")
