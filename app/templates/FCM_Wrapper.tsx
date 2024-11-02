import { createContext } from "react";

import { useFCM } from "@/hooks/useFCM";
import { uc } from "@/hooks/useReactHooks";
import notify from "@/myfunctions/notify";

import FHWrapper from "./FH_Wrapper";
import { UserContext } from "./User_Wrapper";

export const FCMTokenContext = createContext({
  notifToken: "",
});

interface FCMWrapperProps {}

const FCMWrapper: React.FC<FCMWrapperProps> = ({}) => {
  const { user } = uc(UserContext);
  const notifToken = useFCM(user, (payload) =>
    notify(`${payload.notification?.title}`, {
      type: "warning",
      duration: 10000,
    })
  );

  return (
    <FCMTokenContext value={{ notifToken }}>
      <FHWrapper />
    </FCMTokenContext>
  );
};

export default FCMWrapper;
