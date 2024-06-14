import json
import subprocess


class FirebaseHelper:
    @staticmethod
    def get_url():
        bytes_output = subprocess.check_output(
            ["firebase", "hosting:sites:list", "--json"],
            stderr=subprocess.PIPE,
            shell=True,
        )

        json_output = json.loads(bytes_output)
        url = json_output["result"]["sites"][0]["defaultUrl"]
        # project_id = json_output["result"]["sites"][0]["name"].split("/")[-1]

        return url

    @staticmethod
    def set_project_id(project_id: str):
        subprocess.check_call(
            f"firebase use {project_id}", shell=True, stdout=subprocess.PIPE
        )
