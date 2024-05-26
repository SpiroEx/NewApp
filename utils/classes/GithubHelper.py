import os
import subprocess

import requests

from classes.Constants import Constants
from classes.MetadataHelper import MetadataHelper


class GithubHelper:
    url = "https://api.github.com/orgs/Manila-Arduino/repos"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {os.getenv('GITHUB_TOKEN')}",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    def create_repo():
        if Constants.TITLE == "":
            MetadataHelper.set_title()

        repo_name = Constants.TITLE.lower().replace(" ", "-")

        data = {
            "name": repo_name,
            "description": "",
            "homepage": "https://cielo.com",
            "private": True,
            "has_issues": True,
            "has_projects": True,
            "has_wiki": False,
        }

        response = requests.post(
            GithubHelper.url, headers=GithubHelper.headers, json=data
        )

        if response.status_code != 201:
            print(f"Error creating repo {repo_name}: {response.status_code}")

        repo_url = response.json()["html_url"]
        print(f"Repo: {repo_url}")

        #! Git
        subprocess.run(["git", "remote", "remove", "origin"], shell=True)
        subprocess.run(
            ["git", "remote", "add", "origin", f"{repo_url}.git"], shell=True
        )
        subprocess.run(["git", "branch", "-M", "main"], shell=True)
        subprocess.run(["git", "add", "."], shell=True)
        subprocess.run(["git", "commit", "-m", "Initial Commit"], shell=True)
        subprocess.run(["git", "push", "-u", "origin", "main"], shell=True)
