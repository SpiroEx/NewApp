export interface Device {
  id: string;
  userId: string;
  justMeasuredUserId: string;
  gotData: boolean;
  pef: number;
  fev1: number;
  fvc: number;
  fev1Fvc: number;
}
