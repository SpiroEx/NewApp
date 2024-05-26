from classes.FileHelper import FileHelper
from classes.Rich import Rich


class PageHelper:
    def add_page():
        #! Get Page Name
        name = Rich.ask("Enter page name")

        #! Create Page File
        FileHelper.copy_file(rf"app\custom\MainPage.tsx", rf"app\custom\{name}Page.tsx")
        FileHelper.replace_substring(rf"app\custom\{name}Page.tsx", "Main", name)

        #! Add Page to PageWrapper
        FileHelper.replace_substring(
            rf"app\helpers\PageWrapper.tsx",
            rf"\/\/! \/\* Add Pages Here \*\/",
            rf"//! /* Add Pages Here */\nimport {name}Page from '../custom/{name}Page';",
        )

        FileHelper.replace_substring(
            rf"app\helpers\PageWrapper.tsx",
            rf"export const enum Pages {{\n  Main,",
            rf"export const enum Pages {{\n  Main,\n  {name},",
        )

        FileHelper.replace_substring(
            rf"app\helpers\PageWrapper.tsx",
            rf"{{\/\*\/\/! Add Page Mapping Here \*\/}}",
            rf"{{/*//! Add Page Mapping Here */}}\n        {{page === Pages.{name} && <{name}Page />}}",
        )

    def remove_page():
        #! Get Page Name
        name = Rich.ask("Enter page name")

        #! Remove Page File
        FileHelper.remove_file(rf"app\custom\{name}Page.tsx")

        #! Remove Page from PageWrapper
        FileHelper.replace_substring(
            rf"app\helpers\PageWrapper.tsx",
            rf"\nimport {name}Page from '../custom/{name}Page';",
            "",
        )

        FileHelper.replace_substring(
            rf"app\helpers\PageWrapper.tsx",
            rf"\n  {name},",
            "",
        )

        FileHelper.replace_substring(
            rf"app\helpers\PageWrapper.tsx",
            rf"\n        {{page === Pages.{name} && <{name}Page />}}",
            "",
        )
