import { TailwindContext } from "@/app/templates/Tailwind_Wrapper";
import { useC, useF } from "@/hooks/useReactHooks";
import { Dispatch, SetStateAction } from "react";
import { PuffLoader } from "react-spinners";

interface MeasureMeasuring2PageProps {
  setMeasuringState: Dispatch<SetStateAction<number>>;
}

const MeasureMeasuring2Page: React.FC<MeasureMeasuring2PageProps> = ({
  setMeasuringState,
}) => {
  const { getColor } = useC(TailwindContext);

  useF(() => {
    const timer = setTimeout(() => {
      setMeasuringState(3);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div className="ccc-20 pt-40">
      <PuffLoader
        color={`${getColor("loading_icon")}`}
        loading
        // size={150}
      />
      <p className="t73">Waiting for data...</p>
    </div>
  );
};

export default MeasureMeasuring2Page;
