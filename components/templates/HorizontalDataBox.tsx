import { twMerge } from "tailwind-merge";
import Txt from "./Txt";

interface HorizontalDataBoxProps {
  title: string;
  data: number;
  icon: React.ReactNode;
  unit: string;
  full?: boolean;
}

const HorizontalDataBox: React.FC<HorizontalDataBoxProps> = ({
  title,
  data,
  icon,
  unit,
  full = false,
}) => {
  return (
    <div
      className={twMerge(
        "flex justify-between items-center rounded-2xl py-4 pl-3 pr-4 bg-bg bg-opacity-75 shadow drop-shadow-lg",
        full ? "w-full" : "w-40"
      )}
    >
      <div className="flex w-full flex-col gap-2">
        <Txt.section>{title}</Txt.section>
        <div className="flex w-full justify-between">
          <div className="flex">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border rounded-full"></div>
              <Txt.number>{maxDecimal(data)}</Txt.number>
            </div>
            <Txt.exponent>{unit}</Txt.exponent>
          </div>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default HorizontalDataBox;

function maxDecimal(data: number): string {
  if (data > 999)
    return data.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });

  return data.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}
