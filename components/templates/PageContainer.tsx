import { twMerge } from "tailwind-merge";

interface PageContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "csc-12 wf hf min-hs overflow-scroll-y pt-10 pb-20 px-8 bg-aspect-ratio",
        className
      )}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
