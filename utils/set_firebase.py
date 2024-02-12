import re
from src.replace_substring_in_file import replace_substring_in_file
from src.autoformat_file import autoformat_file
from src.yn_prompt import yn_prompt
import subprocess
import json


def set_firebase():
    will_use = yn_prompt("Will use firebase")

    if not will_use:
        return

    config = get_config()
    while config == "":
        print("\nError: Invalid link\n")
        config = get_config()

    replace_substring_in_file(
        "app/firebase.ts",
        r"const firebaseConfig = {\s*apiKey:\s([^}]+)};",
        f"{config}",
    )

    autoformat_file("app/firebase.ts")

    project_id = extract_project_id(config)
    print(f"Project ID: {project_id}")

    subprocess.run(f"firebase use {project_id}", shell=True)

    hosting_url = get_hosting_url()
    print(f"Hosting URL: {hosting_url}")

    # TODO: Update


# jq '.result.channels[]|select(.name|contains(\"live\")) | .url'
def get_hosting_url():
    result = subprocess.run(
        f"firebase hosting:channel:list --json",
        capture_output=True,
        shell=True,
    )

    if result.returncode == 0:
        json_data = json.loads(result.stdout)
        channels = json_data["result"]["channels"]
        if len(channels) == 0:
            raise ValueError(
                "Executing 'firebase hosting:channel:list --json' did not work"
            )

        hosting_url = channels[0]["url"]
        return hosting_url
    else:
        raise ValueError(
            "Executing 'firebase hosting:channel:list --json' did not work"
        )


def extract_project_id(config: str):
    match = re.search(r'projectId: "([^"]+)"', config)

    if match:
        projectId: str = match.group(1)
        return projectId
    else:
        raise ValueError("No projectId parsed in firebase config")


def get_config():
    config = input("Enter firebaseConfig: ")
    return config


if __name__ == "__main__":
    set_firebase()
