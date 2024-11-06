from automation import FileHelper

name = "XXX"

FileHelper.replace_substring(
    rf"app\helpers\PageWrapper.tsx",
    rf"{{\/\*\/\/! Add Page Mapping Here \*\/}}",
    rf"{{/*//! Add Page Mapping Here */}}\n        {{page === Pages.{name} && <{name}Page />}}",
)
