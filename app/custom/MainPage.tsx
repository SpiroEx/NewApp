import CheckCircleIcon from "@/components/svg/icon/CheckCircleIcon";
import EditRoundedIcon from "@/components/svg/icon/EditRoundedIcon";
import EmailIcon from "@/components/svg/icon/EmailIcon";
import ExitIcon from "@/components/svg/icon/ExitIcon";
import WarningIcon from "@/components/svg/icon/WarningIcon";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  return (
    <PageContainer>
      <Txt.title>TITLE</Txt.title>
      <Txt.title>TITLE</Txt.title>
      <CheckCircleIcon />
      <EditRoundedIcon />
      <ExitIcon />
      <EmailIcon />
      <WarningIcon />
    </PageContainer>
  );
};

export default MainPage;
