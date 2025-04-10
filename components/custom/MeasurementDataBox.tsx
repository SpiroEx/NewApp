import { twMerge } from "tailwind-merge";

interface MeasurementDataBoxProps {
  label: string;
  unit: string;
  value: string | number | undefined;
  toFixed?: number;
  pass?: boolean;
  fail?: boolean;
}

const MeasurementDataBox: React.FC<MeasurementDataBoxProps> = ({
  label,
  unit,
  value,
  toFixed,
  pass = false,
  fail = false,
}) => {
  let valueStr = value;
  if (toFixed && typeof value === "number") {
    valueStr = value.toFixed(toFixed);
  } else if (value === undefined) {
    valueStr = "-";
  }

  return (
    <div
      className={twMerge(
        "relative b-4 b-light_gray ccc-1 py-3 w-32 bg-light_gray rounded-xl t-black",
        pass && " !b-green",
        fail && "!b-red-600"
      )}
    >
      <div className="rss-1">
        <p className="t74">{valueStr}</p>
        <p className="t33">{unit}</p>
      </div>
      <p className="t63">{label}</p>
      {pass && <p className="t55 absolute bottom-1 left-2 text-green">P</p>}
      {fail && <p className="t55 absolute bottom-1 left-2 text-red-600">F</p>}
    </div>
  );
};

export default MeasurementDataBox;
