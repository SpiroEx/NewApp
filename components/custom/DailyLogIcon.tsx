import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface DailyLogIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const DailyLogIcon: React.FC<DailyLogIconProps> = ({
  onClick,
  size = 45,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.75 5.62502C36.8567 5.62502 39.375 8.14341 39.375 11.25V15.2679C39.375 15.8943 39.375 16.2076 39.2314 16.4363C39.1564 16.5555 39.0555 16.6564 38.9363 16.7313C38.7075 16.875 38.3944 16.875 37.7679 16.875H28.125M33.75 5.62502C30.6433 5.62502 28.125 8.14341 28.125 11.25V16.875M33.75 5.62502H13.125C9.58946 5.62502 7.82169 5.62502 6.72336 6.72336C5.625 7.82171 5.625 9.58948 5.625 13.125V39.375L11.25 37.5L16.875 39.375L22.5 37.5L28.125 39.375V16.875"
        stroke="#222222"
        strokeWidth="1.875"
      />
      <path
        d="M13.125 13.125H20.625"
        stroke="#222222"
        strokeWidth="1.875"
        strokeLinecap="round"
      />
      <path
        d="M15 20.625H13.125"
        stroke="#222222"
        strokeWidth="1.875"
        strokeLinecap="round"
      />
      <path
        d="M13.125 28.125H18.75"
        stroke="#222222"
        strokeWidth="1.875"
        strokeLinecap="round"
      />
    </MotionSvg>
  );
};

export default DailyLogIcon;
