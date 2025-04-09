import { useS } from "@/hooks/useReactHooks";
import MyButton from "../templates/MyButton";
import PageContainer from "../templates/PageContainer";
import MeasureMeasuring1Page from "./MeasureMeasuring1Page";
import MeasureMeasuring2Page from "./MeasureMeasuring2Page";
import MeasureMeasuring3Page from "./MeasureMeasuring3Page";

interface MeasureMeasuringPageProps {}

const MeasureMeasuringPage: React.FC<MeasureMeasuringPageProps> = ({}) => {
  const [measuringState, setMeasuringState] = useS<number>(1);
  return (
    <PageContainer>
      {/*//! 1: BREATHING */}
      {measuringState === 1 && (
        <MeasureMeasuring1Page setMeasuringState={setMeasuringState} />
      )}
      {/*//! 2: WAITING */}
      {measuringState === 2 && (
        <MeasureMeasuring2Page setMeasuringState={setMeasuringState} />
      )}
      {/*//! 3: FAILED */}
      {measuringState === 3 && (
        <MeasureMeasuring3Page setMeasuringState={setMeasuringState} />
      )}
    </PageContainer>
  );
};

export default MeasureMeasuringPage;
