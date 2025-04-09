import FH from "@/classes/FH";
import { LogDevice } from "@/classes/LogDevice";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useFHPagination } from "@/hooks/useFHPagination";
import { createContext } from "react";
import LogsTable from "../z/Logs/LogsTable";
import { MyUserLog } from "@/classes/MyUserLog";
import { FHContext } from "../templates/FH_Wrapper";
import { useC } from "@/hooks/useReactHooks";
import DateHelper from "@/classes/templates/DateHelper";

export const LogPageContext = createContext({});

interface LogPageProps {}

const LogPage: React.FC<LogPageProps> = ({}) => {
  const { myUser } = useC(FHContext);
  const myUserPagination = useFHPagination<MyUserLog>(
    FH.MyUserLog(myUser?.id ?? ""),
    "createdAt",
    "desc",
    12,
    [myUser?.id]
  );

  return (
    <LogPageContext value={{}}>
      <PageContainer className="!gap-5">
        <p className="t73">Logs</p>
        <LogsTable
          data={myUserPagination.data.map((u) => [
            DateHelper.epochMsToLogDate(u.createdAt.toDate().getTime()),
            u.pef,
            u.fev1,
            u.fvc,
            u.fev1Fvc,
          ])}
          headers={["Date", "PEF", "FEV1", "FVC", "FEV1/FVC"]}
          legends={[
            ["PEF", "Peak Expiratory Flow"],
            ["FEV1", "Forced Expiratory Volume in 1 second"],
            ["FVC", "Forced Vital Capacity"],
            ["FEV1/FVC", "FEV1/FVC Ratio"],
          ]} // Add legends for each column
          pagination={myUserPagination}
          classNameHeader="t46c"
          classNameBody="t22c"
        />
      </PageContainer>
    </LogPageContext>
  );
};

export default LogPage;
