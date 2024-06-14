from classes.FileHelper import FileHelper


class ConstantsTs:
    @staticmethod
    def _replace(old: str, new: str):
        FileHelper.replace_substring(
            "classes/Constants.ts",
            old,
            new,
        )

    @staticmethod
    def get_title_parts(title: str):
        if " " in title:
            title1 = title.split(" ")[0]
            title2 = " ".join(title.split(" ")[1:])
        else:
            title1 = title
            title2 = ""

        return title1, title2

    @staticmethod
    def set_title(title: str):
        ConstantsTs._replace(
            r'ProjTitle: "(.*)",',
            f'ProjTitle: "{title}",',
        )

    @staticmethod
    def set_title1(title1: str):
        ConstantsTs._replace(
            r'ProjTitle1: "(.*)",',
            f'ProjTitle1: "{title1}",',
        )

    @staticmethod
    def set_title2(title2: str):
        ConstantsTs._replace(
            r'ProjTitle2: "(.*)",',
            f'ProjTitle2: "{title2}",',
        )

    @staticmethod
    def set_about(about: str):
        ConstantsTs._replace(
            r'About: "(.*)",',
            f'About: "{about}",',
        )

    @staticmethod
    def set_use_firebase(use_firebase: bool):
        ConstantsTs._replace(
            r"useFirebase: (.*),",
            f"useFirebase: {str(use_firebase).lower()},",
        )

    @staticmethod
    def set_use_sign_in(use_sign_in: bool):
        ConstantsTs._replace(
            r"useSignIn: (.*),",
            f"useSignIn: {str(use_sign_in).lower()},",
        )

    @staticmethod
    def set_use_register(use_register: bool):
        ConstantsTs._replace(
            r"useRegister: (.*),",
            f"useRegister: {str(use_register).lower()},",
        )

    @staticmethod
    def set_use_fcm(use_fcm: bool):
        ConstantsTs._replace(
            r"useFCM: (.*),",
            f"useFCM: {str(use_fcm).lower()},",
        )

    @staticmethod
    def set_vapid_key(vapid_key: str):
        ConstantsTs._replace(
            r'vapidKey: "(.*)",',
            f'vapidKey: "{vapid_key}",',
        )

    @staticmethod
    def set_use_t_and_c(use_t_and_c: bool):
        ConstantsTs._replace(
            r"useTermsAndConditions: (.*),",
            f"useTermsAndConditions: {str(use_t_and_c).lower()},",
        )

    @staticmethod
    def set_t_and_c(t_and_c: str):
        ConstantsTs._replace(
            r'termsLink: "(.*)",',
            f'termsLink: "{t_and_c}",',
        )
