import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useFHPagination } from "@/hooks/useFHPagination";
import SocialMediaSample from "../z/SocialMedia/SocialMediaSample";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  return (
    <PageContainer>
      <Txt.title className="">TITLE</Txt.title>
      <SocialMediaSample />
      <WebsiteVersion />
    </PageContainer>
  );
};

export default MainPage;
