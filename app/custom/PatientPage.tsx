import { createContext } from "react";
import { useC, useS } from "@/hooks/useReactHooks";
import PatientFindPage from "@/components/custom/PatientFindPage";
import { MyUser } from "@/classes/MyUser";
import PatientFoundPage from "@/components/custom/PatientFoundPage";
import LogPage from "./LogPage";

export const PatientPageContext = createContext({});

interface PatientPageProps {}

const PatientPage: React.FC<PatientPageProps> = ({}) => {
  const [patient, setPatient] = useS<MyUser | null>(null);

  return (
    <PatientPageContext value={{}}>
      {patient === null && <PatientFindPage setPatient={setPatient} />}
      {patient !== null && (
        <LogPage
          myUserSelected={patient}
          noBackMain
          onBack={() => {
            setPatient(null);
          }}
        />
      )}
    </PatientPageContext>
  );
};

export default PatientPage;
