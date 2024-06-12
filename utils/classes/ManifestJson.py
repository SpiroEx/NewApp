from classes.FileHelper import FileHelper


class ManifestJson:
    @staticmethod
    def _replace(old: str, new: str):
        FileHelper.replace_substring(
            "public/manifest.json",
            old,
            new,
        )

    @staticmethod
    def set_name(title: str):
        ManifestJson._replace(
            r'"name": "(.*)",',
            f'"name": "{title}",',
        )

    @staticmethod
    def set_short_name(title: str):
        ManifestJson._replace(
            r'"short_name": "(.*)",',
            f'"short_name": "{title}",',
        )

    @staticmethod
    def set_theme_color(color: str):
        ManifestJson._replace(
            r'"theme_color": "(.*)"',
            f'"theme_color": "{color}"',
        )

    @staticmethod
    def set_background_color(color: str):
        ManifestJson._replace(
            r'"background_color": "(.*)"',
            f'"background_color": "{color}"',
        )
