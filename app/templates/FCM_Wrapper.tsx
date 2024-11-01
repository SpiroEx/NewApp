import { Config } from "@/classes/Constants";
import { useFCM } from "@/hooks/useFCM";
import notify from "@/myfunctions/notify";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User_Wrapper";
import FHWrapper from "./FH_Wrapper";
import { uc } from "@/hooks/useReactHooks";

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
