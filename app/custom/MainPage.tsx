import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useFHPagination } from "@/hooks/useFHPagination";
import SocialMediaSample from "../z/SocialMedia/SocialMediaSample";
import ProfileDashboardIcon from "@/components/custom/ProfileDashboardIcon";
import DashboardBox from "@/components/custom/DashboardBox";
import { Pages } from "../helpers/PageWrapper";
import MeasureIcon from "@/components/custom/MeasureIcon";
import DailyLogIcon from "@/components/custom/DailyLogIcon";
import { useC } from "@/hooks/useReactHooks";
import { FHContext } from "../templates/FH_Wrapper";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const { myUser } = useC(FHContext);

  return (
    <PageContainer noBackIcon>
      <div className="wf csc-15 pt-20">
        <div className="wf rcc-15">
          <DashboardBox
            label="Profile"
            icon={<ProfileDashboardIcon />}
            page={Pages.Profile}
          />
          {myUser?.role === "Patient" && (
            <DashboardBox
              label="Measure"
              icon={<MeasureIcon />}
              page={Pages.Measure}
            />
          )}
          {myUser?.role === "Doctor" && (
            <DashboardBox
              label="Patient"
              icon={<DailyLogIcon />}
              page={Pages.Patient}
            />
          )}
        </div>
        <div className="wf rcc-15">
          {myUser?.role === "Patient" && (
            <DashboardBox
              label="Daily Log"
              icon={<DailyLogIcon />}
              page={Pages.Log}
            />
          )}
        </div>
      </div>

      <WebsiteVersion />
    </PageContainer>
  );
};

export default MainPage;
