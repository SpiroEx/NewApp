import subprocess


class AutoFormat:
    def _try_wrap(func):
        def wrapper(file_path: str, *args, **kwargs) -> None:
            try:
                func(file_path, *args, **kwargs)
                # print(f"File {file_path} formatted successfully.")
            except subprocess.CalledProcessError:
                print(f"Error: Failed to format {file_path}.")

        return wrapper

    @_try_wrap
    def typescript(file_path: str) -> None:
        subprocess.run(f"npx prettier --write {file_path}", shell=True)

    @_try_wrap
    def python(file_path: str) -> None:
        subprocess.run(["black", file_path], check=True)
