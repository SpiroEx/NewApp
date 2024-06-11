import Txt from "./Txt";

interface HorizontalDataBoxProps {
  title: string;
  data: React.ReactNode;
  icon: React.ReactNode;
}

const HorizontalDataBox: React.FC<HorizontalDataBoxProps> = ({
  title,
  data,
  icon,
}) => {
  return (
    <div className="w-full flex justify-between items-center border border-text rounded-2xl py-4 pl-6 pr-4">
      <div className="flex flex-col gap-6">
        <Txt.section>{title}</Txt.section>
        <Txt.number>{data}</Txt.number>
      </div>
      {icon}
    </div>
  );
};

export default HorizontalDataBox;
