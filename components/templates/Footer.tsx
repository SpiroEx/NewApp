import { motion } from "framer-motion";
import { useContext } from "react";
import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";
import { twMerge } from "tailwind-merge";

interface FooterProps {
  pages?: [Pages, React.ReactNode][];
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ pages, className }) => {
  const { page: currentPage } = useContext(PageWrapperContext);

  const footerPages = pages?.map(([page, icon]) => page);

  return pages && footerPages && footerPages.includes(currentPage) ? (
    <div
      className={twMerge(
        "fixed z-20 bottom-0 w-screen h-16 shadow-lg flex justify-around bg-footer",
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {pages.map(([page, icon]) => (
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
    <motion.div
      className="w-full h-full flex items-center justify-center cursor-pointer"
      whileTap={{ scale: 0.8 }}
      style={{ opacity: currentPage === page ? 1 : 0.4 }}
      onClick={() => setPage(page)}
    >
      {icon}
    </motion.div>
  );
};

export default Footer;
