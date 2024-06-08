import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import MainPage from "../custom/MainPage";
//! /* Add Pages Here */
import Overlay from "@/components/templates/Overlay";
import Footer from "@/components/templates/Footer";

//? ----------------------
//? PAGES
//? BOTTOM SHEETS
//? ----------------------

export const enum Pages {
  Main,
}

export const PageWrapperContext = createContext({
  page: Pages.Main,
  setPage: {} as Dispatch<SetStateAction<Pages>>,
  overlay: null as ReactNode | null,
  setOverlay: {} as Dispatch<SetStateAction<ReactNode | null>>,
});

interface PageWrapperProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({}) => {
  //! OVERLAY
  const [overlay, setOverlay] = useState<ReactNode | null>(null);

  //! Page
  const [page, setPage] = useState<Pages>(Pages.Main);

  return (
    <PageWrapperContext.Provider
      value={{
        page,
        setPage,
        overlay,
        setOverlay,
      }}
    >
      <Footer
        className="bg-black"
        // pages={{
        //   [Pages.Main]: <DashboardIcon />,
        //   [Pages.History]: <PaperIcon />,
        // }}
      />

      <div className="w-full h-full overflow-y-auto">
        {page === Pages.Main && <MainPage />}
        {/*//! Add Page Mapping Here */}
      </div>
      {overlay && <Overlay setOverlay={setOverlay}>{overlay}</Overlay>}
    </PageWrapperContext.Provider>
  );
};

export default PageWrapper;
