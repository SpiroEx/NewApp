import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

interface FadeInUpwardDivProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInUpwardDiv: React.FC<FadeInUpwardDivProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={className}
      variants={variants}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

// Export the component
export default FadeInUpwardDiv;
