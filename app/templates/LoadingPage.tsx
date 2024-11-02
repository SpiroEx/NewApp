import React from "react";
import { ScaleLoader } from "react-spinners";

import { uc } from "@/hooks/useReactHooks";

import { TailwindContext } from "./Tailwind_Wrapper";

interface LoadingPageProps {
  hideIcon?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ hideIcon = false }) => {
  const { getColor } = uc(TailwindContext);
  return (
    <div className="fcc fixed left-0 top-0 z-10 select-none ws hs">
      {!hideIcon && (
        <ScaleLoader
          color={`${getColor("loading_icon")}`}
          loading
          // size={150}
        />
      )}
    </div>
  );
};

export default LoadingPage;
