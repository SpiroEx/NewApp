import { messaging } from "@/app/firebase";
import FH from "@/classes/FH";
import { FCMToken } from "@/classes/Token";
import { User } from "firebase/auth";
import { MessagePayload, getToken, onMessage } from "firebase/messaging";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteToken } from "firebase/messaging";
import { Config } from "@/classes/Constants";
import { FCMTokenContext } from "@/app/templates/FCM_Wrapper";

export function useFCM(
  user: User | null,
  callback: (payload: MessagePayload) => any
) {
  const [notifToken, setNotifToken] = useState("");

  useEffect(() => {
    if (!user) return;

    requestPermission();
    requestForToken(setNotifToken);
    onMessageListenerForeground((payload) => {
      console.log("Message received. ", payload);
      callback(payload);
    });
  }, [user]);

  return notifToken;
}

export abstract class FCMTokenHelper {
  static async createToken(user: User) {
    if (!Config.useFCM) return;
    const { notifToken } = useContext(FCMTokenContext);
    if (!notifToken) return;

    const fcm_token: FCMToken = {
      id: notifToken,
      email: user.email!,
      userId: user.uid,
    };

    console.log(`NotifToken: ${notifToken}`);

    if (notifToken) {
      await FH.FCMToken.create(fcm_token);
    }
  }

  static async deleteToken() {
    if (!Config.useFCM) return;
    const { notifToken } = useContext(FCMTokenContext);
    if (!notifToken) return;
    const m = await messaging;
    if (!m) return;

    await FH.FCMToken.delete({
      id: notifToken,
      userId: "",
      email: "",
    } as FCMToken);

    await deleteToken(m);
  }
}

const onMessageListenerForeground = async (
  callback: (payload: MessagePayload) => any
) =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      if (!messagingResolve) return;
      console.log("Listening for messages");
      onMessage(messagingResolve, (payload) => {
        callback(payload);
        resolve(payload);
      });
    })()
  );

const requestForToken = async (callback: (token: string) => any) => {
  try {
    const messagingResolve = await messaging;
    if (!messagingResolve) return;

    const currentToken = await getToken(messagingResolve, {
      vapidKey:
        "BGEeizjq4M1kKGi8gVVb_tWJafknFGX_6JEgtkq2x3hjDqXXHwWRDMQHhOi5YOmnjBA5hix5Aakuhe1osnVLGXw",
    });
    if (currentToken) {
      console.log("Token: ", currentToken);
      // subscribeTokenToTopic(currentToken);
      callback(currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // new Notification("Thanks for granting permission!");

      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    }
  });
}
