import { Timestamp } from "firebase/firestore";

export interface MyUserLog {
  id: string;
  createdAt: Timestamp;
  pef: number;
  fev1: number;
  fvc: number;
  fev1Fvc: number;
}
