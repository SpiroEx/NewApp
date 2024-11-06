import WebsiteVersion from "@/components/custom/WebsiteVersion";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  return (
    <PageContainer>
      <Txt.title className="">TITLE</Txt.title>

      <WebsiteVersion />
    </PageContainer>
  );
};

export default MainPage;
