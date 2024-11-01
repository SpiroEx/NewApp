import { Config } from "@/classes/Constants";
import { Device } from "@/classes/Device";
import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import { AdminSettings } from "@/classes/templates/AdminSettings";
import QuasarPage from "@/components/templates/QuasarPage";
import { useFHWatch } from "@/hooks/useFHWatch";
import { useLoading as useInitialLoading } from "@/hooks/useLoading";
import { createContext, useContext } from "react";
import PageWrapper from "../helpers/PageWrapper";
import RegisterPage from "../helpers/RegisterPage";
import SignInPage from "../helpers/SignInPage";
import { UserContext } from "./User_Wrapper";
import EmailVerificationPage from "./EmailVerificationPage";
import { uc } from "@/hooks/useReactHooks";

//? ----------------------
//? FIRESTORE DATA OBJECTS
//? ----------------------

export const FHContext = createContext({
  adminSettings: {} as AdminSettings,
  myUser: {} as MyUser | null,
  device: {} as Device | null,
});

interface FHWrapperProps {}

const FHWrapper: React.FC<FHWrapperProps> = () => {
  const { user, loadingUser } = uc(UserContext);

  //! QUASAR
  const [adminSettings, loadingAdminSettings] = useFHWatch(
    FH.AdminSettings,
    "settings"
  );

  //! MY USER
  const [myUser, loadingMyUser] = useFHWatch(FH.MyUser, user?.uid);

  //! DEVICE
  const [device, loadingDevice] = useFHWatch(FH.Device, "readings");

  //! LOADING
  const loading = useInitialLoading(
    loadingAdminSettings,
    loadingUser,
    loadingMyUser,
    loadingDevice
  );

  //! PAGES
  if (loading) return <div className="ws hs"></div>;
  if (adminSettings === null) return <QuasarPage />;
  if (adminSettings?.quasar) return <QuasarPage />;
  if (Config.useSignIn) {
    if (user === null) return <SignInPage />;

    if (Config.useEmailVerification && !user.emailVerified) {
      return <EmailVerificationPage user={user} />;
    }

    if (Config.useRegister) {
      if (myUser === null) return <RegisterPage user={user} />;
    }
  }

  return (
    <FHContext value={{ adminSettings, myUser, device }}>
      <PageWrapper />
    </FHContext>
  );
};

export default FHWrapper;
