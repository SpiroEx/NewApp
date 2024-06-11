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
        "w-full h-full min-h-screen overflow-scroll-y flex flex-col items-center pt-10 pb-20 px-8 gap-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
