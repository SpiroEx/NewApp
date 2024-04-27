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
        "w-full h-full min-h-screen overflow-scroll flex flex-col items-center pt-10 pb-20 bg-gray-600 text-white gap-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
