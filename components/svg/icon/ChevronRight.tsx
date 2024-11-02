import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ChevronRightProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  color?: string;
  className?: string;
  nonBouncing?: boolean;
}

const ChevronRight: React.FC<ChevronRightProps> = ({
  onClick,
  size = 11,
  color = "black",
  className,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp", className)}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 53 99"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.00208 3.30371L49.5299 49.8316L3.00208 96.3594"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MotionSvg>
);

export default ChevronRight;
