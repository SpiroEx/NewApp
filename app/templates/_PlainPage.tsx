import PageContainer from "@/components/templates/PageContainer";
import { createContext } from "react";

export const PlainPageContext = createContext({
  //
});

interface PlainPageProps {}

const PlainPage: React.FC<PlainPageProps> = ({}) => {
  return (
    <PlainPageContext.Provider value={{}}>
      <PageContainer>
        <p>PlainPage</p>
      </PageContainer>
    </PlainPageContext.Provider>
  );
};

export default PlainPage;
