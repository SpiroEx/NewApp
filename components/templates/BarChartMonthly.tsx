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
    <div className="mx-10 text-justify px-10 py-4 flex flex-col gap-3 items-center rounded-xl border border-white">
      {/*//! TITLE */}
      <p className="font-semibold text-lg">{title}</p>

      {/*//! DATA */}
      <div className="flex gap-4 items-end h-28">
        {barChartMonthly.data.map((data) => (
          <div
            className="flex flex-col items-center"
            key={`${data.year}-${data.month}`}
          >
            <p className="font-extralight text-xs">{data.value}</p>
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
                "font-light text-sm",
                data.year < barChartMonthly.lastShownYear && "opacity-50"
              )}
            >
              {data.month}
            </p>
          </div>
        ))}
      </div>

      {/*//! YEAR CONTROL */}
      <div className="flex gap-8 items-center mt-3">
        <ChevronLeft onClick={barChartMonthly.prev} size={7} />
        <p className="font-light text-base">{barChartMonthly.lastShownYear}</p>
        <ChevronRight onClick={barChartMonthly.next} size={7} />
      </div>
    </div>
  );
};

export default BarChartMonthly;
