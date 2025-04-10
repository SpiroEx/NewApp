import MyButton from "@/components/templates/MyButton";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useC, useF, useS } from "@/hooks/useReactHooks";
import { createContext } from "react";
import { FHContext } from "../templates/FH_Wrapper";
import MeasureInstructionPage from "@/components/custom/MeasureInstructionPage";
import MeasureMeasuringPage from "@/components/custom/MeasureMeasuringPage";
import MeasureMeasuredPage from "@/components/custom/MeasureMeasuredPage";
import FH from "@/classes/FH";
import { serverTimestamp, Timestamp } from "firebase/firestore";

export const MeasurePageContext = createContext({});

interface MeasurePageProps {}

const MeasurePage: React.FC<MeasurePageProps> = ({}) => {
  const { device, myUser, adminSettings } = useC(FHContext);
  const [savedData, setSavedData] = useS(false);

  const isMeasured =
    device &&
    myUser &&
    device.justMeasuredUserId === myUser.id &&
    device.gotData === true;

  const isMeasuring =
    !isMeasured &&
    device &&
    myUser &&
    device.userId === myUser.id &&
    device.gotData === false;

  const notMeasuring = !isMeasuring && !isMeasured;

  useF(() => {
    if (device && myUser && device.gotData && !savedData) {
      FH.MyUserLog(myUser.id).create({
        id: new Date().getTime().toString(),
        createdAt: Timestamp.now(),
        pef: device.pef * adminSettings.pefMultiplier,
        fev1: device.fev1 * adminSettings.fev1Multiplier,
        fvc: device.fvc * adminSettings.fvcMultiplier,
        fev1Fvc:
          (device.fev1 * adminSettings.fev1Multiplier) /
          (device.fvc * adminSettings.fvcMultiplier),
      });
      setSavedData(true);
    }
  });

  console.log(
    device?.justMeasuredUserId,
    myUser?.id,
    device?.justMeasuredUserId === myUser?.id
  );
  console.log(isMeasuring, isMeasured, notMeasuring);

  return (
    <MeasurePageContext value={{}}>
      {/*//! NOT MEASURING */}
      {notMeasuring && <MeasureInstructionPage />}
      {/*//! MEASURING */}
      {isMeasuring && <MeasureMeasuringPage />}
      {/*//! MEASURED */}
      {isMeasured && <MeasureMeasuredPage />}
    </MeasurePageContext>
  );
};

export default MeasurePage;
