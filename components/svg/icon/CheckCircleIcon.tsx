import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";

interface CheckCircleIconProps {
  onClick?: MouseEventHandler<HTMLParagraphElement>;
  size?: number;
}

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({ onClick }) => {
  return (
    <MotionSvg
      className="rcc cursor-pointer w-5 h-5 border border-green-500 rounded-full bg-light-green"
      whileTap={{ scale: 0.8 }}
    >
      <p className="text-sm text-green-500 font-bold" onClick={onClick}>
        ✓
      </p>
    </MotionSvg>
  );
};

export default CheckCircleIcon;
