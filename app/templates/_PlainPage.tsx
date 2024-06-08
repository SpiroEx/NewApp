import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { createContext } from "react";

export const PlainPageContext = createContext({
  //
});

interface PlainPageProps {}

const PlainPage: React.FC<PlainPageProps> = ({}) => {
  return (
    <PlainPageContext.Provider value={{}}>
      <PageContainer>
        <Txt.title>PlainPage</Txt.title>
      </PageContainer>
    </PlainPageContext.Provider>
  );
};

export default PlainPage;
