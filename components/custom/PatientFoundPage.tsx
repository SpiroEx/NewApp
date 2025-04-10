import { MyUser } from "@/classes/MyUser";
import { Dispatch, SetStateAction } from "react";
import PageContainer from "../templates/PageContainer";

interface PatientFoundPageProps {
  patient: MyUser;
  setPatient: Dispatch<SetStateAction<MyUser | null>>;
}

const PatientFoundPage: React.FC<PatientFoundPageProps> = ({
  patient,
  setPatient,
}) => {
  return <PageContainer>sa</PageContainer>;
};

export default PatientFoundPage;
