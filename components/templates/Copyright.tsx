import { Constants } from "@/classes/Constants";

interface CopyrightProps {}

const Copyright: React.FC<CopyrightProps> = ({}) => {
  return (
    <div className="fixed left-0 bottom-0 w-full flex items-center text-center py-2">
      <p className="m-auto opacity-75 text-sm">© {Constants.ProjTitle}</p>
    </div>
  );
};

export default Copyright;
