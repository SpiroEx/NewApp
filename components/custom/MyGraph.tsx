import { FHContext } from "@/app/templates/FH_Wrapper";
import Chart_Line, { Chart_LineProps } from "../templates/Chart_Line";
import GraphData from "../templates/GraphData";
import { useC } from "@/hooks/useReactHooks";
import DH from "@/classes/templates/DH";
import { MyUser } from "@/classes/MyUser";
import { orderBy } from "firebase/firestore";
import FH from "@/classes/FH";
import { useFHWatchQuery } from "@/hooks/useFHWatchQuery";
import { useEffect, useState } from "react";

interface MyGraphProps {
  myUser: MyUser | null;
}

const MyGraph: React.FC<MyGraphProps> = ({ myUser }) => {
  //! LOGS for graph
  const [logs, loadingLogs] = useFHWatchQuery(
    FH.MyUserLog(myUser?.id ?? ""),
    [myUser?.id],
    orderBy("id", "asc")
  );

  //! PEF CHART DATA
  const pefLineData: Chart_LineProps["lines"][number] = {
    label: "PEF",
    color: "#8884d8",
    values: logs.map((log) => ({
      x: DH.militaryTime(new Date(Number(log.id))),
      y: Number(log.pef.toFixed(2)),
    })),
  };

  //! FEV1 CHART DATA
  const fev1LineData: Chart_LineProps["lines"][number] = {
    label: "FEV1",
    color: "#82ca9d",
    values: logs.map((log) => ({
      x: DH.militaryTime(new Date(Number(log.id))),
      y: Number(log.fev1.toFixed(2)),
    })),
  };

  //! FVC CHART DATA
  const fvcLineData: Chart_LineProps["lines"][number] = {
    label: "FVC",
    color: "#ffc658",
    values: logs.map((log) => ({
      x: DH.militaryTime(new Date(Number(log.id))),
      y: Number(log.fvc.toFixed(2)),
    })),
  };

  //! FEV1/FVC CHART DATA
  const fev1FvcLineData: Chart_LineProps["lines"][number] = {
    label: "FEV1/FVC",
    color: "#ff7300",
    values: logs.map((log) => ({
      x: DH.militaryTime(new Date(Number(log.id))),
      y: Number(log.fev1Fvc.toFixed(2)),
    })),
  };

  // Prepare arrays of timestamps and each metric
  const times = logs.map((log) => Number(log.id));
  const pefVals = logs.map((log) => log.pef);
  const fev1Vals = logs.map((log) => log.fev1);
  const fvcVals = logs.map((log) => log.fvc);
  const ratioVals = logs.map((log) => log.fev1Fvc);

  // Four booleans indicating positive overall slope
  const isPefIncreasing = computeSlope(pefVals, times) > 0;
  const isFev1Increasing = computeSlope(fev1Vals, times) > 0;
  const isFvcIncreasing = computeSlope(fvcVals, times) > 0;
  const isFev1FvcIncreasing = computeSlope(ratioVals, times) > 0;

  const [filtered, setFiltered] = useState<number | null>(null);
  const [graphs, setGraphs] = useState<Chart_LineProps["lines"]>([pefLineData, fev1LineData, fvcLineData, fev1FvcLineData])

  useEffect(()=>{
    if (filtered === null) {
      setGraphs([pefLineData, fev1LineData, fvcLineData, fev1FvcLineData])
    } else {
      const filteredGraphs = [pefLineData, fev1LineData, fvcLineData, fev1FvcLineData].filter((_, i) => i === filtered)
      setGraphs(filteredGraphs)
    }
  },[filtered])

  return (
    <div className="wf csc-5">
      <GraphData
        title="Log History"
        tooltip="This graph shows the history of your logs. The data is collected from your device and displayed here for you to track your progress."
      >
        <Chart_Line
          lines={graphs}
        />
      </GraphData>

      {/*//! IMPROVING / NOT */}
      <div className="css-4 w-60">
        <div className="grid grid-cols-1 gap-3 px-2 w-80">
          <button className="r-20 b-2 border-color-white rounded-xl" onClick={()=>setFiltered(null)}>Clear Filters</button>
          {[
            `PEF is ${isPefIncreasing ? "improving. Keep it up!" : "decreasing. Keep on breathing!"}`,
            `FEV1 is ${isFev1Increasing ? "improving. Keep it up!" : "decreasing. Keep on breathing!"}`,
            `FVC is ${isFvcIncreasing ? "improving. Keep it up!" : "decreasing. Keep on breathing!"}`,
            `FEV1/FVC is ${isFev1FvcIncreasing ? "improving. Keep it up!" : "decreasing. Keep on breathing!"}`,
          ].map((text, i) => (
            <span key={i} onClick={()=>setFiltered(i)} className="flex gap-2 items-center pointer">
              <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
              <p className="t43 o-75">{text}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGraph;

// Helper to compute linear regression slope
const computeSlope = (values: number[], times: number[]): number => {
  const n = values.length;
  if (n < 2) return 0;
  const xMean = times.reduce((sum, x) => sum + x, 0) / n;
  const yMean = values.reduce((sum, y) => sum + y, 0) / n;
  let num = 0,
    den = 0;
  for (let i = 0; i < n; i++) {
    const dx = times[i] - xMean;
    const dy = values[i] - yMean;
    num += dx * dy;
    den += dx * dx;
  }
  return den === 0 ? 0 : num / den;
};
