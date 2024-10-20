import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface EmailLogoProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const EmailLogo: React.FC<EmailLogoProps> = ({ onClick, size = 109 }) => (
  <motion.svg
    onClick={onClick}
    className="select-none"
    width={size}
    viewBox="0 0 109 109"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2025_15)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 96.183H109V12.8301H0V96.183ZM6.41175 21.3834V19.2418H102.588V21.3833L54.5 63.0855L6.41175 21.3833V21.3834ZM102.588 29.8726V83.834L82.6541 58.9178L77.6401 62.9188L99.1195 89.7712H9.88051L31.3599 62.9188L26.3459 58.9178L6.41175 83.834V29.8726L54.5 71.5747L102.588 29.8726H102.588Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_2025_15">
        <rect width="109" height="109" fill="white" />
      </clipPath>
    </defs>
  </motion.svg>
);

export default EmailLogo;
