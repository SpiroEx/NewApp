import { twMerge } from "tailwind-merge";

interface DirectionArrowsProps {
  icon: React.ReactNode;
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  gap?: number;
}

const DirectionArrows: React.FC<DirectionArrowsProps> = ({
  icon,
  onUp,
  onDown,
  onLeft,
  onRight,
  gap = 3,
}) => {
  return (
    <div
      className={twMerge("w-full flex flex-col items-center")}
      style={{
        gap: `${gap}rem`,
      }}
    >
      <div className="" onClick={onUp}>
        {icon}
      </div>
      <div
        className="w-full flex justify-center"
        style={{
          gap: `${gap}rem`,
        }}
      >
        <div className="-rotate-90" onClick={onLeft}>
          {icon}
        </div>
        <div className="opacity-0 select-none">{icon}</div>
        <div className="rotate-90" onClick={onRight}>
          {icon}
        </div>
      </div>
      <div className="rotate-180" onClick={onDown}>
        {icon}
      </div>
    </div>
  );
};

export default DirectionArrows;
