import subprocess
from dataclasses import dataclass
from .rich import Rich


@dataclass
class Automate:
    @Rich.wrap
    def init():
        Automate.npm_install()

    @Rich.info(":rocket: Installing npm dependencies...")
    def npm_install():
        subprocess.run(["npm", "install", "--no-audit", "--no-fund"], shell=True)

    @Rich.info(":rocket: Installing pip requirements")
    def pip_install():
        subprocess.run(["python", "-m", "venv", "utils/venv"], shell=True)
        # python -m venv utils/venv
        # cd utils &&  && cd .. && call utils/venv/Scripts/activate && pip install -r utils/requirements.txt
