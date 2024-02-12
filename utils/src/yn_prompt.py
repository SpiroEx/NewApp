def yn_prompt(prompt: str):
    inp = input(f"{prompt} [Y/n]? ")
    if inp in ["y", "Y", ""]:
        return True

    return False
