import { FHContext } from "@/app/templates/FH_Wrapper";
import MyButton from "../templates/MyButton";
import PageContainer from "../templates/PageContainer";
import { useC, useF } from "@/hooks/useReactHooks";
import FH from "@/classes/FH";
import DashboardBox from "./DashboardBox";
import MeasurementDataBox from "./MeasurementDataBox";
import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";

interface MeasureMeasuredPageProps {}

const MeasureMeasuredPage: React.FC<MeasureMeasuredPageProps> = ({}) => {
  const { device, myUser } = useC(FHContext);
  const { setPage } = useC(PageWrapperContext);

  async function goHome() {
    if (!device) return;
    await FH.Device.update(device, {
      userId: "",
      gotData: false,
      justMeasuredUserId: "",
    });

    setPage(Pages.Main);
  }

  return (
    <PageContainer onBack={goHome}>
      {/*//! INSTRUCTION */}
      <div className="csc-4">
        <p className="t73">Measurement Data</p>

        <div className="wf csc-15 pt-8">
          <div className="wf rcc-15">
            <MeasurementDataBox label="PEF" unit="L/s" value={device?.pef} />
            <MeasurementDataBox label="FEV1" unit="L" value={device?.fev1} />
          </div>
          <div className="wf rcc-15">
            <MeasurementDataBox label="FVC" unit="L" value={device?.fvc} />
            <MeasurementDataBox
              label="FEV1/FVC"
              unit="%"
              value={device?.fev1Fvc}
            />
          </div>
        </div>
      </div>

      {/*//! START */}
      <div className="csc-1">
        <div className="w-min m-auto">
          <MyButton label="Home" onClick={goHome} className="mt-4" />
        </div>
      </div>
    </PageContainer>
  );
};

export default MeasureMeasuredPage;
