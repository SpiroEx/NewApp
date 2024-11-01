import { MotionDiv } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";

interface CrossCircleIconProps {
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}

const CrossCircleIcon: React.FC<CrossCircleIconProps> = ({ onClick }) => {
  return (
    <MotionDiv
      className="cursor-pointer flex items-center justify-center w-6 h-6 border border-black rounded-full bg-light-red select-none"
      whileTap={{ scale: 0.8 }}
    >
      <p className="text-lg " onClick={onClick}>
        X
      </p>
    </MotionDiv>
  );
};

export default CrossCircleIcon;
