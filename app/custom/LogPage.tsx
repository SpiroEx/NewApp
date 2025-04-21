import FH from "@/classes/FH";
import { LogDevice } from "@/classes/LogDevice";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useFHPagination } from "@/hooks/useFHPagination";
import { createContext } from "react";
import LogsTable from "../z/Logs/LogsTable";
import { MyUserLog } from "@/classes/MyUserLog";
import { FHContext } from "../templates/FH_Wrapper";
import { useC, useS } from "@/hooks/useReactHooks";
import DateHelper from "@/classes/templates/DateHelper";
import {
  getIdealFev1,
  getIdealPef,
  getIdealFvc,
  MyUser,
} from "@/classes/MyUser";
import IdealParam from "@/components/custom/IdealParam";
import DownloadIcon from "@/components/custom/DownloadIcon";
import downloadCsv from "@/myfunctions/downloadCsv";
import ProfileBar from "@/components/custom/ProfileBar";
import getAge from "@/myfunctions/getAge";

export const LogPageContext = createContext({});

interface LogPageProps {
  myUserSelected?: MyUser | null;
  onBack?: () => void;
  noBackMain?: boolean;
}

const LogPage: React.FC<LogPageProps> = ({
  myUserSelected,
  onBack,
  noBackMain,
}) => {
  const { myUser: myUserOriginal } = useC(FHContext);

  const myUser = myUserSelected ?? myUserOriginal;

  const [loading, setLoading] = useS(false);
  const myUserPagination = useFHPagination<MyUserLog>(
    FH.MyUserLog(myUser?.id ?? ""),
    "createdAt",
    "desc",
    5,
    [myUser?.id]
  );

  const idealPef = getIdealPef(myUser);
  const idealFev1 = getIdealFev1(myUser);
  const idealFvc = getIdealFvc(myUser);

  async function downloadData() {
    if (loading || !myUser) return;
    setLoading(true);
    const name = myUser.name;
    const age = getAge(myUser.birthdate.toDate());
    const birthdate = myUser.birthdate.toDate();
    const gender = myUser.gender;
    const height = myUser.height;

    FH.MyUserLog(myUser.id)
      .getAll()
      .then((logs) => {
        // Add data

        let csv = logs
          .map(
            (log) =>
              `${DateHelper.epochMsToLogDate(log.createdAt.toDate().getTime())},${name},${age},${birthdate},${gender},${height},${log.pef},${log.fev1},${log.fvc},${log.fev1Fvc}`
          )
          .join("\n");

        // Add headers
        csv = `Date,Name,Age,Birthdate,Gender,Height,PEF,FEV1,FVC,FEV1/FVC\n${csv}`;

        // get date time for filename
        let datenow = new Date().toISOString().replace(/:/g, "-").split(".")[0];

        // Download
        downloadCsv(csv, `${myUser.name}-${datenow}.csv`);
      });
    setLoading(false);
  }

  return (
    <LogPageContext value={{}}>
      <PageContainer className="!gap-5" noBackMain={noBackMain} onBack={onBack}>
        <div className="rcc-4">
          <p className="t73">Logs</p>
          <DownloadIcon onClick={downloadData} disabled={loading} />
        </div>

        <ProfileBar myUser={myUser} />

        <LogsTable
          data={myUserPagination.data.map((u) => [
            DateHelper.epochMsToLogDate(u.createdAt.toDate().getTime()),
            <p className="" key={u.id}>
              {u.pef.toFixed(2)}{" "}
              {u.pef >= idealPef ? (
                <span className="text-green">P</span>
              ) : (
                <span className="text-red-500">F</span>
              )}
            </p>,
            <p className="" key={u.id}>
              {u.fev1.toFixed(2)}{" "}
              {u.fev1 >= idealFev1 ? (
                <span className="text-green">P</span>
              ) : (
                <span className="text-red-500">F</span>
              )}
            </p>,
            <p className="" key={u.id}>
              {u.fvc.toFixed(2)}{" "}
              {u.fvc >= idealFvc ? (
                <span className="text-green">P</span>
              ) : (
                <span className="text-red-500">F</span>
              )}
            </p>,
            `${Math.round(u.fev1Fvc * 100)} %`,
          ])}
          headers={["Date", "PEF", "FEV1", "FVC", "FEV1/FVC"]}
          legends={[
            ["PEF", "Peak Expiratory Flow (L/s)"],
            ["FEV1", "Forced Expiratory Volume in 1 second (L)"],
            ["FVC", "Forced Vital Capacity (L)"],
            ["FEV1/FVC", "FEV1/FVC Ratio (%)"],
            ["P", "Pass"],
            ["F", "Fail"],
          ]} // Add legends for each column
          pagination={myUserPagination}
          classNameHeader="t46c"
          classNameBody="t22c"
        />

        {/*//! IDEAL */}
        <IdealParam />
      </PageContainer>
    </LogPageContext>
  );
};

export default LogPage;
