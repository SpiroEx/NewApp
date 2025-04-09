interface MeasurementDataBoxProps {
  label: string;
  unit: string;
  value: number | undefined;
}

const MeasurementDataBox: React.FC<MeasurementDataBoxProps> = ({
  label,
  unit,
  value,
}) => {
  return (
    <div className="ccc-1 py-3 w-32 bg-light_gray rounded-xl t-black">
      <div className="rss-1">
        <p className="t74">{value}</p>
        <p className="t33">{unit}</p>
      </div>
      <p className="t63">{label}</p>
    </div>
  );
};

export default MeasurementDataBox;
