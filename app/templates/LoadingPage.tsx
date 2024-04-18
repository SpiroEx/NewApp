import React, { useContext } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { TailwindContext } from "./Tailwind_Wrapper";

interface LoadingPageProps {
  hideIcon?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ hideIcon = false }) => {
  const { getColor } = useContext(TailwindContext);
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-10 select-none">
      {!hideIcon && (
        <ClimbingBoxLoader
          color={`${getColor("loading_icon")}`}
          loading={true}
          // size={150}
        />
      )}
    </div>
  );
};

export default LoadingPage;
