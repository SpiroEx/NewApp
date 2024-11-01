import { Dispatch, SetStateAction, createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import LoadingPage from "./LoadingPage";
import UserWrapper from "./User_Wrapper";
import { Config } from "@/classes/Constants";
import PageWrapper from "../helpers/PageWrapper";
import { us } from "@/hooks/useReactHooks";

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
  const [loading, setLoading] = us(false);

  return (
    <>
      {/* //! FH WRAPPER PAGE */}
      <LoadingContext value={{ loading, setLoading }}>
        {Config.useFirebase ? <UserWrapper /> : <PageWrapper />}
      </LoadingContext>

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
