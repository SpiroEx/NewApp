from classes.FileHelper import FileHelper


class FirebaseJson:
    @staticmethod
    def _replace(old: str, new: str):
        FileHelper.replace_substring(
            "firebase.json",
            old,
            new,
        )

    @staticmethod
    def set_functions(functions: bool):
        if not functions:
            FirebaseJson._replace(
                r',\n  "functions": [[\s\S]*?\n  ]',
                "",
            )

    @staticmethod
    def set_storage(storage: bool):
        if not storage:
            FirebaseJson._replace(
                r',\n  "storage": {[\s\S]*?\n  }',
                "",
            )
