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
import { us } from "@/hooks/useReactHooks";

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
  const [overlay, setOverlay] = us<ReactNode | null>(null);

  //! Page
  const [page, setPage] = us<Pages>(Pages.Main);

  return (
    <PageWrapperContext
      value={{
        page,
        setPage,
        overlay,
        setOverlay,
      }}
    >
      <Footer
        className=""
        // pages={{
        //   [Pages.Main]: <ControlsIcon />,
        //   [Pages.Settings]: <SettingsIcon />,
        // }}
      />

      <div className="w-full h-full overflow-y-auto">
        {page === Pages.Main && <MainPage />}
        {/*//! Add Page Mapping Here */}
      </div>
      {overlay && <Overlay setOverlay={setOverlay}>{overlay}</Overlay>}
    </PageWrapperContext>
  );
};

export default PageWrapper;
