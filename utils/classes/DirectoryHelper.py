import glob
import os
from typing import List


class DirectoryHelper:
    def get_files(directory_path: str, pattern: str = "*") -> List[str]:
        return glob.glob(os.path.join(directory_path, pattern))
