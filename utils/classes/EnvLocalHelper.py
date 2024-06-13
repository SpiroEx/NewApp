import re
import subprocess
from classes.FileHelper import FileHelper


class EnvLocalHelper:
    @staticmethod
    def _replace(old: str, new: str):
        FileHelper.replace_substring(
            ".env.local",
            old,
            new,
        )

    @staticmethod
    def set_firebase_config(firebase_config: str):
        # Define the pattern to extract key-value pairs
        pattern = r'(\w+):\s*"([^"]+)"'

        # Find all matches in the string
        matches = re.findall(pattern, firebase_config)

        # Function to convert camelCase to SNAKE_CASE
        def camel_to_snake(name):
            s1 = re.sub("([a-z0-9])([A-Z])", r"\1_\2", name)
            return s1.upper()

        # Define the prefix for environment variables
        prefix = "NEXT_PUBLIC_FIREBASE_"

        # Create the environment variable strings
        env_vars = [
            f'{prefix}{camel_to_snake(key)}="{value}"' for key, value in matches
        ]

        # Join the environment variables with new lines
        env_vars_str = "\n".join(env_vars)

        # Print the result
        EnvLocalHelper._replace(
            r"NEXT_PUBLIC_FIREBASE_API_KEY=([\s\S]*)NEXT_PUBLIC_FIREBASE_APP_ID=(.*)",
            f"{env_vars_str}",
        )

    @staticmethod
    def set_firebase_id(firebase_config: str):
        pattern = r'"projectId": "(.*)"'
        matches = re.findall(pattern, firebase_config)
        firebase_id = matches[0]
        subprocess.check_call(
            f"firebase use {firebase_id}", shell=True, stdout=subprocess.PIPE
        )
