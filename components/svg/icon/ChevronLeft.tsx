import { MouseEventHandler } from "react";
import ChevronRight from "./ChevronRight";

interface ChevronLeftProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  color?: string;
  className?: string;
}

const ChevronLeft: React.FC<ChevronLeftProps> = ({
  onClick,
  size,
  color,
  className,
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
      />
    </div>
  );
};

export default ChevronLeft;
