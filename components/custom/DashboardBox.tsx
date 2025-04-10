import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";
import ProfileDashboardIcon from "./ProfileDashboardIcon";
import { useC } from "@/hooks/useReactHooks";

interface DashboardBoxProps {
  label: string;
  icon: React.ReactNode;
  page: Pages;
}

const DashboardBox: React.FC<DashboardBoxProps> = ({ label, icon, page }) => {
  const { setPage } = useC(PageWrapperContext);
  return (
    <div
      className="cec-1 pb-2 w-32 h-28 bg-light_gray rounded-xl t-black cp"
      onClick={() => {
        setPage(page);
      }}
    >
      {icon}
      <p className="t63 truncate">{label}</p>
    </div>
  );
};

export default DashboardBox;
