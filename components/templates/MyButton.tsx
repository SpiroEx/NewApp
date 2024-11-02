import { MotionDiv } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface MyButtonProps {
  onClick?: MouseEventHandler;
  label: string;
  type?: "button" | "submit" | "reset";
  pX?: number;
  pY?: number;
  disabled?: boolean;
  className?: string;
  classNameBtn?: string;
  classNameText?: string;
  outlined?: boolean;
  dashed?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  label,
  type,
  pX = 1.2,
  pY = 0.8,
  disabled,
  className,
  classNameBtn,
  classNameText,
  outlined = false,
  dashed = false,
}) => {
  return (
    <MotionDiv
      className={twMerge(
        "tc wf max-w-sm rounded-full bg-button m-0 shadow-none outline-none select-none",
        outlined && "bg-transparent border border-zinc-600",
        dashed && "border-dashed",
        disabled && "cursor-default opacity-50",
        className
      )}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1.0 : 0.8 }}
    >
      <button
        type={type}
        disabled={disabled}
        className={twMerge(
          "m-auto min-wf min-hf rounded-lg",
          classNameBtn,
          disabled ? "cursor-default" : "cursor-pointer"
        )}
      >
        <p
          className={twMerge(
            "t-white font-light w-max m-auto",
            outlined && "t-black",
            classNameText
          )}
          style={{ padding: `${pY}rem ${pX}rem` }}
        >
          {label}
        </p>
      </button>
    </MotionDiv>
  );
};

export default MyButton;
