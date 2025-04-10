import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface DownloadIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
  disabled?: boolean;
}

const DownloadIcon: React.FC<DownloadIconProps> = ({
  onClick,
  size = 30,
  nonBouncing = false,
  disabled = false,
}) => {
  return (
    <MotionSvg
      onClick={(e) => {
        if (disabled) return;
        onClick?.(e);
      }}
      className={twMerge(
        "sn",
        !nonBouncing && onClick && "cp",
        disabled && "o-50 cursor-default"
      )}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8.75V17.5M15 17.5L18.75 13.75M15 17.5L11.25 13.75"
        stroke="#61F0A1FF"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 21.25H15H10"
        stroke="#61F0A1FF"
        strokeWidth="1.875"
        strokeLinecap="round"
      />
      <path
        d="M2.5 15C2.5 9.10744 2.5 6.16116 4.33059 4.33059C6.16116 2.5 9.10744 2.5 15 2.5C20.8925 2.5 23.8389 2.5 25.6694 4.33059C27.5 6.16116 27.5 9.10744 27.5 15C27.5 20.8925 27.5 23.8389 25.6694 25.6694C23.8389 27.5 20.8925 27.5 15 27.5C9.10744 27.5 6.16116 27.5 4.33059 25.6694C2.5 23.8389 2.5 20.8925 2.5 15Z"
        stroke="#61F0A1FF"
        strokeWidth="1.875"
      />
    </MotionSvg>
  );
};

export default DownloadIcon;
