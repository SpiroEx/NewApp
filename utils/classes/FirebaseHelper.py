import subprocess


class FirebaseHelper:
    @staticmethod
    def get_url():
        # run firebase hosting:sites:list --json | powershell -Command "$input | ConvertFrom-Json | Select-Object -ExpandProperty result | Select-Object -ExpandProperty sites | Select-Object -First 1 | Select-Object -ExpandProperty defaultUrl"

        subprocess.check_call(
            [
                "firebase",
                "hosting:sites:list",
                "--json",
            ],
            shell=True,
        )
