import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC16tbPAHt7u9svX7xBkoRwVPete3hh0bg",
  authDomain: "rain-fall-website.firebaseapp.com",
  projectId: "rain-fall-website",
  storageBucket: "rain-fall-website.appspot.com",
  messagingSenderId: "995345965240",
  appId: "1:995345965240:web:90781d3899255960a8d44d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    console.log("Firebase not supported this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();
