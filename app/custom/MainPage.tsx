import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import LogsTable from "@/app/z/Logs/LogsTable";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useFHPagination } from "@/hooks/useFHPagination";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const myUserPagination = useFHPagination<MyUser>(FH.MyUser, "name", "asc", 5);
  return (
    <PageContainer>
      <Txt.title className="">TITLE</Txt.title>
      <LogsTable
        data={[1, 2, 3, 4, 5, 5].map((u) => [
          "User Recommendation Update",
          "from 2, it became 5",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
        ])}
        headers={["id", "n", "p", "k", "ph", "sm", "temp", "ec"]}
        legends={[["N", "Nitrogen"]]}
        pagination={myUserPagination}
      />
      <WebsiteVersion />
    </PageContainer>
  );
};

export default MainPage;
