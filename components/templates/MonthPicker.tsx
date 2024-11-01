import { useState } from "react";
import ChevronLeft from "../svg/icon/ChevronLeft";
import ChevronRight from "../svg/icon/ChevronRight";
import DropdownButton from "../templates/DropdownButton";
import DateHelper from "@/classes/templates/DateHelper";
import { twMerge } from "tailwind-merge";
import { MotionDiv } from "@/types/framer_motion_types";

interface MonthPickerProps {
  onChange?: (month: number, year: number) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const [shownYear, setShownYear] = useState<number>(selectedYear);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <DropdownButton
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      icon={
        <div className="flex items-end gap-2">
          <p className="text-base font-semibold">
            {DateHelper.monthAbbrev[selectedMonth]},
          </p>
          <p className="text-base font-light opacity-50">{shownYear}</p>
        </div>
      }
      expandDirection="bottom-right"
      className="bg-gray border-zinc-400 border"
    >
      <div className="flex flex-col gap-2 items-center">
        {/*//! YEAR */}
        <div className="w-full flex justify-between items-center py-2 px-4">
          <ChevronLeft
            color="white"
            onClick={() => setShownYear((y) => y - 1)}
          />
          <p className="">{shownYear}</p>
          <ChevronRight
            color="white"
            onClick={() => setShownYear((y) => y + 1)}
          />
        </div>
        <hr className="w-full opacity-30" />
        {/*//! MONTH */}
        <div className="flex flex-wrap justify-center w-48">
          {DateHelper.monthAbbrev.map((month, index) => {
            //? Selected Month
            const isSelectedMonth =
              selectedMonth === index && selectedYear === shownYear;

            //? Current Month
            const isCurrentMonth =
              new Date().getMonth() === index &&
              selectedYear === new Date().getFullYear();

            //? After current month
            const isAfterCurrentMonth =
              shownYear > new Date().getFullYear() ||
              (shownYear === new Date().getFullYear() &&
                index > new Date().getMonth());

            return (
              <MotionDiv
                key={index}
                onClick={() => {
                  if (isAfterCurrentMonth) return;
                  setSelectedMonth(index);
                  setSelectedYear(shownYear);
                  onChange?.(index, selectedYear);
                  setIsExpanded(false);
                }}
                className="p-2 w-16"
                whileTap={{ scale: 0.9 }}
              >
                <p
                  className={twMerge(
                    "text-center font-extralight rounded-md",
                    isSelectedMonth && "bg-slate-600",
                    isAfterCurrentMonth && "opacity-50"
                  )}
                >
                  {month}
                </p>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </DropdownButton>
  );
};

export default MonthPicker;
