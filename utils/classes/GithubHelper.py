import os

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
            "name": "Hello-World",
            "description": "This is your first repository",
            "homepage": "https://cielo.com",
            "private": True,
            "has_issues": True,
            "has_projects": True,
            "has_wiki": False,
        }

        response = requests.post(
            GithubHelper.url, headers=GithubHelper.headers, json=data
        )

        if response.status_code == 201:
            repo_url = response.json()["html_url"]
            print(f"Repo: {repo_url}")
        else:
            print(f"Error creating repo {repo_name}: {response.status_code}")
