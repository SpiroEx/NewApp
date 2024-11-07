import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext } from "react";

import Footer from "@/components/templates/Footer";
//! /* Add Pages Here */
import Overlay from "@/components/templates/Overlay";
import { useS } from "@/hooks/useReactHooks";

import MainPage from "../custom/MainPage";
import Sample_LogsPage from "../z/Logs/Sample_LogsPage";

// ? ----------------------
// ? PAGES
// ? BOTTOM SHEETS
// ? ----------------------

export const enum Pages {
  Main,
}

//********************************* */
const defaultPage = Pages.Main;
//********************************* */

export const PageWrapperContext = createContext({
  page: Pages.Main,
  setPage: {} as Dispatch<SetStateAction<Pages>>,
  overlay: null as ReactNode | null,
  setOverlay: {} as Dispatch<SetStateAction<ReactNode | null>>,
});

interface PageWrapperProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({}) => {
  //! OVERLAY
  const [overlay, setOverlay] = useS<ReactNode | null>(null);

  //! Page
  const [page, setPage] = useS<Pages>(defaultPage);

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

      <div className="overflow-y-auto wf hf">
        {page === Pages.Main && <MainPage />}
        {/*//! Add Page Mapping Here */}
      </div>
      {overlay && <Overlay setOverlay={setOverlay}>{overlay}</Overlay>}
    </PageWrapperContext>
  );
};

export default PageWrapper;
