import { FHContext } from "@/app/templates/FH_Wrapper";
import MyButton from "../templates/MyButton";
import PageContainer from "../templates/PageContainer";
import { useC, useF } from "@/hooks/useReactHooks";
import FH from "@/classes/FH";
import DashboardBox from "./DashboardBox";
import MeasurementDataBox from "./MeasurementDataBox";
import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";
import IdealParam from "./IdealParam";
import { getIdealFev1, getIdealFvc, getIdealPef } from "@/classes/MyUser";

interface MeasureMeasuredPageProps {}

const MeasureMeasuredPage: React.FC<MeasureMeasuredPageProps> = ({}) => {
  const { device, myUser, adminSettings } = useC(FHContext);
  const { setPage } = useC(PageWrapperContext);

  const pef = (device?.pef ?? 0) * adminSettings.pefMultiplier;
  const fev1 = (device?.fev1 ?? 0) * adminSettings.fev1Multiplier;
  const fvc = (device?.fvc ?? 0) * adminSettings.fvcMultiplier;
  const fev1Fvc = Math.round((fev1 / fvc) * 100);

  const idealPef = getIdealPef(myUser);
  const idealFev1 = getIdealFev1(myUser);
  const idealFvc = getIdealFvc(myUser);

  const passedPef = pef >= idealPef;
  const passedFev1 = fev1 >= idealFev1;
  const passedFvc = fvc >= idealFvc;

  async function goHome() {
    if (!device) return;
    setPage(Pages.Main);
    await FH.Device.update(device, {
      userId: "",
      gotData: false,
      justMeasuredUserId: "",
    });
  }

  return (
    <PageContainer onBack={goHome}>
      {/*//! INSTRUCTION */}
      <div className="csc-4">
        <p className="t73">Measurement Data</p>

        <div className="wf csc-15 pt-8">
          <div className="wf rcc-15">
            <MeasurementDataBox
              label="PEF"
              unit="L/s"
              toFixed={2}
              value={pef}
              pass={passedPef}
              fail={!passedPef}
            />
            <MeasurementDataBox
              label="FEV1"
              unit="L"
              toFixed={2}
              value={fev1}
              pass={passedFev1}
              fail={!passedFev1}
            />
          </div>
          <div className="wf rcc-15">
            <MeasurementDataBox
              label="FVC"
              unit="L"
              toFixed={2}
              value={fvc}
              pass={passedFvc}
              fail={!passedFvc}
            />
            <MeasurementDataBox label="FEV1/FVC" unit="%" value={fev1Fvc} />
          </div>
        </div>
      </div>

      {/*//! Home */}
      <div className="csc-1">
        <div className="w-min m-auto">
          <MyButton label="Home" onClick={goHome} className="mt-4" />
        </div>
      </div>

      {/*//! IDEAL PARAMS */}
      <IdealParam />
    </PageContainer>
  );
};

export default MeasureMeasuredPage;
