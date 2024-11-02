import { FHContext } from "@/app/templates/FH_Wrapper";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { UseBarChartMonthly } from "@/hooks/useBarChartMonthly";
import ChevronLeft from "../svg/icon/ChevronLeft";
import ChevronRight from "../svg/icon/ChevronRight";

interface BarChartMonthlyProps {
  title: string;
  barChartMonthly: UseBarChartMonthly;
}

const BarChartMonthly: React.FC<BarChartMonthlyProps> = ({
  title,
  barChartMonthly,
}) => {
  return (
    <div className="csc-3 mx-10 tj px-10 py-4 rounded-xl border border-white">
      {/*//! TITLE */}
      <p className="t56">{title}</p>

      {/*//! DATA */}
      <div className="rse-4 h-28">
        {barChartMonthly.data.map((data) => (
          <div className="csc" key={`${data.year}-${data.month}`}>
            <p className="t22">{data.value}</p>
            <div
              className="w-7 bg-white"
              style={{
                height: `calc(5rem * ${
                  data.value / barChartMonthly.maxHeight
                })`,
                minHeight: "1px",
                opacity: data.value === 0 ? 0.4 : 1,
              }}
            ></div>
            <p
              className={twMerge(
                "t33",
                data.year < barChartMonthly.lastShownYear && "opacity-50"
              )}
            >
              {data.month}
            </p>
          </div>
        ))}
      </div>

      {/*//! YEAR CONTROL */}
      <div className="rsc-8 mt-3">
        <ChevronLeft onClick={barChartMonthly.prev} size={7} />
        <p className="t43">{barChartMonthly.lastShownYear}</p>
        <ChevronRight onClick={barChartMonthly.next} size={7} />
      </div>
    </div>
  );
};

export default BarChartMonthly;
