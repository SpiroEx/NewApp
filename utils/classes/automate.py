import subprocess
from dataclasses import dataclass

from classes.Rich import Rich
from classes.SVGConverter import SVGConverter


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
        #! TODO: Fix this
        # python -m venv utils/venv
        # cd utils &&  && cd .. && call utils/venv/Scripts/activate && pip install -r utils/requirements.txt

    @Rich.info(":rocket: Converting SVG files to React components...")
    def svg_convert():
        SVGConverter.convert()
