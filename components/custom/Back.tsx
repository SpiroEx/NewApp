import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface BackProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const Back: React.FC<BackProps> = ({
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
        d="M9.84375 21.0938H37.9688C38.3417 21.0938 38.6994 21.2419 38.9631 21.5056C39.2268 21.7694 39.375 22.127 39.375 22.5C39.375 22.873 39.2268 23.2306 38.9631 23.4944C38.6994 23.7581 38.3417 23.9062 37.9688 23.9062H9.84375C9.47079 23.9062 9.1131 23.7581 8.84938 23.4944C8.58566 23.2306 8.4375 22.873 8.4375 22.5C8.4375 22.127 8.58566 21.7694 8.84938 21.5056C9.1131 21.2419 9.47079 21.0938 9.84375 21.0938Z"
        fill="white"
      />
      <path
        d="M10.4259 22.5L22.0894 34.1606C22.3534 34.4247 22.5018 34.7828 22.5018 35.1563C22.5018 35.5297 22.3534 35.8878 22.0894 36.1519C21.8253 36.4159 21.4672 36.5643 21.0938 36.5643C20.7203 36.5643 20.3622 36.4159 20.0981 36.1519L7.44189 23.4956C7.31093 23.365 7.20703 23.2098 7.13613 23.039C7.06524 22.8681 7.02875 22.685 7.02875 22.5C7.02875 22.315 7.06524 22.1319 7.13613 21.961C7.20703 21.7902 7.31093 21.635 7.44189 21.5044L20.0981 8.84813C20.3622 8.58407 20.7203 8.43573 21.0938 8.43573C21.4672 8.43573 21.8253 8.58407 22.0894 8.84813C22.3534 9.11219 22.5018 9.47032 22.5018 9.84376C22.5018 10.2172 22.3534 10.5753 22.0894 10.8394L10.4259 22.5Z"
        fill="white"
      />
    </MotionSvg>
  );
};

export default Back;
