import { Dispatch, SetStateAction } from "react";
import { FHContext } from "@/app/templates/FH_Wrapper";
import FH from "@/classes/FH";
import { useC } from "@/hooks/useReactHooks";
import PageContainer from "../templates/PageContainer";
import MyButton from "../templates/MyButton";

interface MeasureMeasuring3PageProps {
  setMeasuringState: Dispatch<SetStateAction<number>>;
}

const MeasureMeasuring3Page: React.FC<MeasureMeasuring3PageProps> = ({
  setMeasuringState,
}) => {
  const { device, myUser } = useC(FHContext);

  async function startMeasuring() {
    // if (!device || !myUser) return;
    // await FH.Device.update(device, {
    //   userId: myUser.id,
    //   justMeasuredUserId: "",
    //   gotData: false,
    // });

    setMeasuringState(1);
  }

  return (
    <div className="csc-5">
      {/*//! INSTRUCTION */}
      <div className="csc-4 b rounded-xl py-4 px-4">
        <p className="t84">Measurement Failed</p>
        <p className="t62c !w-60">
          Oops! We couldn&apos;t detect your breathing this time. Please take a
          deep breath and try again.
        </p>
      </div>

      {/*//! START */}
      <div className="csc-1">
        <div className="w-min m-auto">
          <MyButton
            label="Let's Try Again"
            onClick={startMeasuring}
            className="mt-4 !bg-purple"
          />
        </div>
      </div>
    </div>
  );
};

export default MeasureMeasuring3Page;
