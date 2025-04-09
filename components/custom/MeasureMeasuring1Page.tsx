import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { useF, useS } from "@/hooks/useReactHooks";

const breatheInSeconds = 6;
const waitSeconds = 3;
const breatheOutSeconds = 6;
let interval: NodeJS.Timer | undefined = undefined;

interface MeasureMeasuring1PageProps {
  setMeasuringState: Dispatch<SetStateAction<number>>;
}

const MeasureMeasuring1Page: React.FC<MeasureMeasuring1PageProps> = ({
  setMeasuringState,
}) => {
  const [breatheState, setBreatheState] = useS<number>(1); // 1: breathe in, 2: wait, 3: breathe out, 4: finished
  const [seconds, setSeconds] = useS<number>(breatheInSeconds);

  useF(() => {
    if (breatheState === 4) {
      clearInterval(interval);
      setMeasuringState(2); // go to next page
      return;
    }
    interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (breatheState === 1) {
            setBreatheState(2);
            return waitSeconds;
          } else if (breatheState === 2) {
            setBreatheState(3);
            return breatheOutSeconds;
          } else {
            console.log("Finished breathing");
            clearInterval(interval);
            setBreatheState(4);
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breatheState]);

  return (
    <div className="wf csc-10">
      <div className="relative wf ccc">
        <div className="w-80 h-80 o-20 bg-bubble_gray rounded-full"></div>
        {/* <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 o-75 bg-bubble_gray rounded-full"></motion.div> */}
        <motion.div
          initial={{
            position: "absolute",
            width: "0",
            height: "0",
            backgroundColor: "#D9D9D9",
            borderRadius: "9999px",
            opacity: 0.75,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: "20rem",
            height: "20rem",
          }}
          transition={{
            repeat: 1,
            repeatType: "reverse",

            duration: 6,
            repeatDelay: waitSeconds,
            ease: "linear",
          }}
        ></motion.div>
      </div>
      <p className="t94 o-50">{seconds} s</p>
      {breatheState === 1 && <p className="t73">Breathe in for 6 seconds</p>}
      {breatheState === 2 && <p className="t73">Prepare to breathe out...</p>}
      {breatheState === 3 && <p className="t73">Breathe out for 6 seconds</p>}
    </div>
  );
};

export default MeasureMeasuring1Page;
