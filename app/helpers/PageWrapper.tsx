import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext } from "react";

import Footer from "@/components/templates/Footer";
//! /* Add Pages Here */
import PatientPage from "../custom/PatientPage";
import LogPage from "../custom/LogPage";
import MeasurePage from "../custom/MeasurePage";
import Overlay from "@/components/templates/Overlay";
import { useS } from "@/hooks/useReactHooks";

import MainPage from "../custom/MainPage";
import Sample_LogsPage from "../z/Logs/Sample_LogsPage";
import ProfilePage from "./ProfilePage";

// ? ----------------------
// ? PAGES
// ? BOTTOM SHEETS
// ? ----------------------

export const enum Pages {
  Main,
  Patient,
  Log,
  Profile,
  Measure,
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
  console.log(page);

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
        {page === Pages.Profile && <ProfilePage />}
        {/*//! Add Page Mapping Here */}
        {page === Pages.Patient && <PatientPage />}
        {page === Pages.Log && <LogPage />}
        {page === Pages.Measure && <MeasurePage />}
      </div>
      {overlay && <Overlay setOverlay={setOverlay}>{overlay}</Overlay>}
    </PageWrapperContext>
  );
};

export default PageWrapper;
