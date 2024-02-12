import { Dispatch, SetStateAction, createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import LoadingPage from "./LoadingPage";
import FHWrapper from "./FH_Wrapper";
import UserWrapper from "./User_Wrapper";
import { Config } from "@/classes/Constants";
import PageWrapper from "../helpers/PageWrapper";

//? ----------------------
//? LOADING PAGE
//? TOAST
//? ----------------------

export const LoadingContext = createContext({
  loading: false,
  setLoading: {} as Dispatch<SetStateAction<boolean>>,
});

interface ConstantsWrapperProps {}

const ConstantsWrapper: React.FC<ConstantsWrapperProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* //! FH WRAPPER PAGE */}
      <LoadingContext.Provider value={{ loading, setLoading }}>
        {Config.useFirebase ? <UserWrapper /> : <PageWrapper />}
      </LoadingContext.Provider>

      {/* //! LOADING PAGE */}
      {loading && <LoadingPage />}

      {/* //! TOAST */}
      <ToastContainer
        className="toast-custom"
        theme="colored"
        autoClose={2000}
        closeButton={false}
      />
    </>
  );
};

export default ConstantsWrapper;
