import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getMessaging, isSupported } from "firebase/messaging"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBvczctR05_VXR8g2H70brz5yWvGbuhS08",
  authDomain: "pulmo-tipq.firebaseapp.com",
  projectId: "pulmo-tipq",
  storageBucket: "pulmo-tipq.firebasestorage.app",
  messagingSenderId: "1030187492084",
  appId: "1:1030187492084:web:c39f5f27c6f486ec08b4a1"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported()
    if (isSupportedBrowser) {
      return getMessaging(app)
    }
    return null
  } catch (err) {
    console.log(err)
    return null
  }
})()
