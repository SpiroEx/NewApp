import { FHContext } from "@/app/templates/FH_Wrapper";
import MyButton from "../templates/MyButton";
import PageContainer from "../templates/PageContainer";
import { useC } from "@/hooks/useReactHooks";
import FH from "@/classes/FH";

interface MeasureInstructionPageProps {}

const MeasureInstructionPage: React.FC<MeasureInstructionPageProps> = ({}) => {
  const { device, myUser } = useC(FHContext);

  // const alreadyMeasuring = device !== null && device?.userId !== "";

  async function startMeasuring() {
    if (!device || !myUser) return;
    await FH.Device.update(device, {
      userId: myUser.id,
      justMeasuredUserId: "",
      gotData: false,
    });
  }

  return (
    <PageContainer>
      {/*//! INSTRUCTION */}
      <div className="csc-4 b rounded-xl py-4 px-4">
        <p className="t84">Instruction</p>
        <div className="wf rss-2">
          <p className="t62 !w-5">1. </p>
          <p className="t62 !w-60">Breathe in for 6 seconds</p>
        </div>
        <div className="wf rss-2">
          <p className="t62 !w-5">2. </p>
          <p className="t62 !w-60">
            Breathe out for 6 seconds with as much strength as you can
          </p>
        </div>
      </div>

      {/*//! START */}
      <div className="csc-1">
        <div className="w-min m-auto">
          <MyButton
            label="Start"
            onClick={startMeasuring}
            // disabled={alreadyMeasuring}
            className="mt-4"
          />
        </div>
        {/* {alreadyMeasuring && (
          <p className="t42 t-red-500">Device being used by another user</p>
        )} */}
      </div>
    </PageContainer>
  );
};

export default MeasureInstructionPage;
