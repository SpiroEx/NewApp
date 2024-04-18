import { Device } from "./Device";
import { MyUser } from "./MyUser";
import FHT, { FHPicture } from "./templates/FHT";
import { AdminSettings } from "./templates/AdminSettings";
import { FCMToken } from "./Token";
import { FieldValue } from "firebase/firestore";

class MyUserFHT extends FHT<MyUser> {
  collectionName = "user";
  Picture = new FHPicture((id) => `user/${id}/profile_picture.jpg`);
}

class DeviceFHT extends FHT<Device> {
  collectionName = "device";
}

class AdminSettingsFHT extends FHT<AdminSettings> {
  collectionName = "admin";
}

class FCMTokenFHT extends FHT<FCMToken> {
  collectionName = "fcm_token";
}

export default abstract class FH {
  static AdminSettings = new AdminSettingsFHT();
  static MyUser = new MyUserFHT();
  static Device = new DeviceFHT();
  static FCMToken = new FCMTokenFHT();
}

export type FHType<T> = {
  [K in keyof T]?: T[K] extends any[]
    ? FieldValue | T[K]
    : T[K] extends number
    ? FieldValue | number
    : T[K];
};
