import { useContext } from "react";
import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";
import { twMerge } from "tailwind-merge";
import { MotionDiv } from "@/types/framer_motion_types";

interface FooterProps {
  pages?: { [key in Pages]?: React.ReactNode };
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ pages, className }) => {
  const { page: currentPage } = useContext(PageWrapperContext);
  return pages && Object.keys(pages).includes(String(currentPage)) ? (
    <div
      className={twMerge(
        "ras fixed z-20 bottom-0 ws h-16 shadow-lg bg-footer",
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {Object.entries(pages).map(([page, icon]) => (
        <FooterIcon key={page} page={Number(page)} icon={icon} />
      ))}
    </div>
  ) : (
    <div></div>
  );
};

interface FooterIconProps {
  page: Pages;
  icon: React.ReactNode;
}
const FooterIcon: React.FC<FooterIconProps> = ({ page, icon }) => {
  const { page: currentPage, setPage } = useContext(PageWrapperContext);
  return (
    <MotionDiv
      className="rcc wf hf cursor-pointer"
      whileTap={{ scale: 0.8 }}
      style={{ opacity: currentPage === page ? 1 : 0.4 }}
      onClick={() => setPage(page)}
    >
      {icon}
    </MotionDiv>
  );
};

export default Footer;
