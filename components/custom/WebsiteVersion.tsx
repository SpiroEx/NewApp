import { Constants } from "@/classes/Constants";
import { use } from "react";

interface WebsiteVersionProps {}

const WebsiteVersion: React.FC<WebsiteVersionProps> = ({}) => {
  use;
  return (
    <div className="rsc fixed left-0 bottom-0 wf tc py-2">
      <p className="m-auto o-50 t2 tracking-widest">
        v {Constants.WebsiteVersion}
      </p>
    </div>
  );
};

export default WebsiteVersion;
