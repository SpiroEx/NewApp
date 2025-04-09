import { Timestamp } from "firebase/firestore";

export interface MyUser {
  id: string;
  name: string;
  photoURL: string;
  email: string;
  // device_id: string;
  birthdate: Timestamp;
  gender: Gender;
  height: number;
}

export type Gender = "Male" | "Female";