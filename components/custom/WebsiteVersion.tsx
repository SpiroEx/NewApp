import { Constants } from "@/classes/Constants";

interface WebsiteVersionProps {}

const WebsiteVersion: React.FC<WebsiteVersionProps> = ({}) => {
  return (
    <div className="fixed left-0 bottom-0 w-full flex items-center text-center py-2">
      <p className="m-auto opacity-50 text-xs tracking-widest">
        v {Constants.WebsiteVersion}
      </p>
    </div>
  );
};

export default WebsiteVersion;
