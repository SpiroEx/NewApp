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
  role: Role;
}

export type Gender = "Male" | "Female";
export type Role = "Patient" | "Doctor";

export function getIdealPef(myUser: MyUser | null) {
  if (!myUser) return 0;
  const age = getAge(myUser.birthdate.toDate());
  const height = myUser.height; // assumed to be in centimeters
  
  if (age < 18) {
    // For children: PEFR = (Ht - 100) x 5 + 100
    return (((height - 100) * 5) + 100) / 60;
  } else {
    // Convert height to meters for adult formulas:
    const heightMeters = height / 100;
    
    if (myUser.gender === "Male") {
      // For adult males: PEFR = (((Height x 5.48) + 1.58) - (Age x 0.041)) x 60
      return (((heightMeters * 5.48) + 1.58) - (age * 0.041));
    } else {
      // For adult females: PEFR = (((Height x 3.72) + 2.24) - (Age x 0.03)) x 60
      return (((heightMeters * 3.72) + 2.24) - (age * 0.03));
    }
  }
}

export function getIdealFvc(myUser: MyUser | null) {
  if (!myUser) return 0;
  const age = getAge(myUser.birthdate.toDate());
  
  if (myUser.gender === "Male") {
    return 0.93 * (0.0576 * myUser.height - 0.0269 * age - 4.34);
  } else {
    return 0.93 * (0.0443 * myUser.height - 0.026 * age - 2.89);
  }
}


export function getIdealFev1(myUser: MyUser | null) {
  if (!myUser) return 0;
  const age = getAge(myUser.birthdate.toDate());
  
  if (myUser.gender === "Male") {
    return 0.93 * (0.043 * myUser.height - 0.029 * age - 2.49);
  } else {
    return 0.93 * (0.0395 * myUser.height - 0.025 * age - 2.6);
  }
}


function getAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}