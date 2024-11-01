import { useUser } from "@/hooks/useUser";
import FCMWrapper from "./FCM_Wrapper";
import { createContext } from "react";
import { User } from "firebase/auth";
import { Config } from "@/classes/Constants";
import FHWrapper from "./FH_Wrapper";

export const UserContext = createContext({
  user: null as User | null,
  loadingUser: false as boolean,
});

interface UserWrapperProps {}

const UserWrapper: React.FC<UserWrapperProps> = ({}) => {
  //! USER
  const [user, loadingUser] = useUser();

  return (
    <UserContext value={{ user, loadingUser }}>
      {Config.useFCM ? <FCMWrapper /> : <FHWrapper />}
    </UserContext>
  );
};

export default UserWrapper;
