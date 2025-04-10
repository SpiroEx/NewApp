import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface MySearchIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const MySearchIcon: React.FC<MySearchIconProps> = ({
  onClick,
  size = 20,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1629 13.1759L17.5 17.5M15 8.75C15 12.2017 12.2017 15 8.75 15C5.29822 15 2.5 12.2017 2.5 8.75C2.5 5.29822 5.29822 2.5 8.75 2.5C12.2017 2.5 15 5.29822 15 8.75Z"
        stroke="#4472C4"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default MySearchIcon;
