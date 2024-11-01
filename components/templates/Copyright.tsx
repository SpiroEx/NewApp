import { Constants } from "@/classes/Constants";

interface CopyrightProps {}

const Copyright: React.FC<CopyrightProps> = ({}) => {
  return (
    <div className="rsc fixed left-0 bottom-0 wf text-center py-2">
      <p className="m-auto opacity-75 text-sm">© {Constants.ProjTitle}</p>
    </div>
  );
};

export default Copyright;
