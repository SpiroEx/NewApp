import PageContainer from "@/components/templates/PageContainer";
import { useFHPagination } from "@/hooks/useFHPagination";
import LogsTable from "./LogsTable";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import { LogDevice } from "@/classes/LogDevice";
import FH from "@/classes/FH";

interface LogsPageProps {}

const LogsPage: React.FC<LogsPageProps> = ({}) => {
  const myUserPagination = useFHPagination<LogDevice>(
    FH.LogDevice,
    "id",
    "asc",
    12
  );

  return (
    <PageContainer>
      <LogsTable
        data={[1, 3, 5, 6, 8].map((u) => [
          "u.id",
          "1111111111111111111111",
          "2222222222222222222222",
          "3333333333333333333333",
          "4444444444444444444444",
          "5555555555555555555555",
          "6666666666666666666666",
          "7777777777777777777777",
          "8888888888888888888888",
        ])}
        headers={["id", "1", "2", "3", "4", "5", "6", "7", "8"]}
        legends={[["id", "Identification"]]}
        pagination={myUserPagination}
        classNameHeader="t46"
      />
      <LogsTable
        data={[1, 3, 5, 6, 8].map((u) => [
          "u.id",
          "1111111111111111111111",
          "2222222222222222222222",
          "3333333333333333333333",
          "4444444444444444444444",
          "5555555555555555555555",
          "6666666666666666666666",
          "7777777777777777777777",
          "8888888888888888888888",
        ])}
        headers={["id", "1", "2", "3", "4", "5", "6", "7", "8"]}
        legends={[["id", "Identification"]]}
        pagination={myUserPagination}
        classNameHeader="t46"
      />
      <LogsTable
        data={[1, 3, 5, 6, 8].map((u) => [
          "u.id",
          "1111111111111111111111",
          "2222222222222222222222",
          "3333333333333333333333",
          "4444444444444444444444",
          "5555555555555555555555",
          "6666666666666666666666",
          "7777777777777777777777",
          "8888888888888888888888",
        ])}
        headers={["id", "1", "2", "3", "4", "5", "6", "7", "8"]}
        legends={[["id", "Identification"]]}
        pagination={myUserPagination}
        classNameHeader="t46"
      />
      <LogsTable
        data={[1, 3, 5, 6, 8].map((u) => [
          "u.id",
          "1111111111111111111111",
          "2222222222222222222222",
          "3333333333333333333333",
          "4444444444444444444444",
          "5555555555555555555555",
          "6666666666666666666666",
          "7777777777777777777777",
          "8888888888888888888888",
        ])}
        headers={["id", "1", "2", "3", "4", "5", "6", "7", "8"]}
        legends={[["id", "Identification"]]}
        pagination={myUserPagination}
        classNameHeader="t46"
      />
      <LogsTable
        data={[1, 3, 5, 6, 8].map((u) => [
          "u.id",
          "1111111111111111111111",
          "2222222222222222222222",
          "3333333333333333333333",
          "4444444444444444444444",
          "5555555555555555555555",
          "6666666666666666666666",
          "7777777777777777777777",
          "8888888888888888888888",
        ])}
        headers={["id", "1", "2", "3", "4", "5", "6", "7", "8"]}
        legends={[["id", "Identification"]]}
        pagination={myUserPagination}
        classNameHeader="t46"
      />
      <WebsiteVersion />
    </PageContainer>
  );
};

export default LogsPage;
