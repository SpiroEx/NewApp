import { twMerge } from "tailwind-merge";
import Txt from "./Txt";
import BackAndroidIcon from "../svg/icon/BackAndroidIcon";
import { TailwindContext } from "@/app/templates/Tailwind_Wrapper";
import { useC } from "@/hooks/useReactHooks";
import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";
import LungsIcon from "../custom/LungsIcon";

interface PageContainerProps {
  children?: React.ReactNode;
  className?: string;
  noBackIcon?: boolean;
  onBack?: () => void;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  noBackIcon = false,
  onBack,
}) => {
  const { getColor } = useC(TailwindContext);
  const { setPage } = useC(PageWrapperContext);

  return (
    <div
      className={twMerge(
        "relative csc-12 wf hf min-hs overflow-scroll-y pt-10 pb-20 px-8 bg-aspect-ratio",
        className
      )}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="wf flex justify-between items-center px-2">
        <BackAndroidIcon
          color={getColor("text")}
          size={28}
          hidden={noBackIcon}
          onClick={() => {
            if (!noBackIcon) {
              setPage(Pages.Main);
              onBack?.();
            }
          }}
        />
        <Txt.title className="">SpiroEx</Txt.title>
        <BackAndroidIcon size={25} hidden />
      </div>
      {children}

      <div className="fixed bottom-12 right-8">
        <LungsIcon />
      </div>
    </div>
  );
};

export default PageContainer;
