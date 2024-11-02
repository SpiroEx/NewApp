import type { MouseEventHandler } from "react";

import ChevronRight from "./ChevronRight";

interface ChevronLeftProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  color?: string;
  className?: string;
  nonBouncing?: boolean;
}

const ChevronLeft: React.FC<ChevronLeftProps> = ({
  onClick,
  size,
  color,
  className,
  nonBouncing = false,
}) => {
  return (
    <div
      className="w-min"
      style={{
        transform: "scaleX(-1)",
      }}
    >
      <ChevronRight
        size={size}
        color={color}
        className={className}
        onClick={onClick}
        nonBouncing={nonBouncing}
      />
    </div>
  );
};

export default ChevronLeft;
