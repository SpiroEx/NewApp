import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ProfileDashboardIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const ProfileDashboardIcon: React.FC<ProfileDashboardIconProps> = ({
  onClick,
  size = 49,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2003_117)">
        <mask
          id="mask0_2003_117"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="49"
          height="49"
        >
          <path d="M49 0H0V49H49V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2003_117)">
          <g filter="url(#filter0_d_2003_117)">
            <path
              d="M29.2703 25.2076L28.7395 24.3356C28.3959 24.5449 28.2072 24.9363 28.2577 25.3355C28.3079 25.7344 28.5878 26.0668 28.9727 26.1842L29.2703 25.2076ZM19.7294 25.2076L20.0272 26.1842C20.4119 26.0668 20.6919 25.7344 20.7423 25.3355C20.7925 24.9363 20.6039 24.5449 20.2602 24.3356L19.7294 25.2076ZM32.6667 17.3542C32.6667 20.3105 31.0964 22.901 28.7395 24.3356L29.8012 26.0796C32.7412 24.2899 34.7083 21.0522 34.7083 17.3542H32.6667ZM24.5 9.1875C29.0102 9.1875 32.6667 12.8438 32.6667 17.3542H34.7083C34.7083 11.7163 30.1378 7.14584 24.5 7.14584V9.1875ZM16.3332 17.3542C16.3332 12.8438 19.9896 9.1875 24.5 9.1875V7.14584C18.862 7.14584 14.2916 11.7163 14.2916 17.3542H16.3332ZM20.2602 24.3356C17.9034 22.901 16.3332 20.3105 16.3332 17.3542H14.2916C14.2916 21.0522 16.2586 24.2899 19.1986 26.0796L20.2602 24.3356ZM19.4317 24.2311C12.9867 26.1964 8.13309 31.81 7.27943 38.6696L9.30545 38.9217C10.058 32.8745 14.3403 27.9182 20.0272 26.1842L19.4317 24.2311ZM7.27943 38.6696C7.0538 40.4826 8.55569 41.8542 10.2082 41.8542V39.8125C9.60564 39.8125 9.25258 39.3468 9.30545 38.9217L7.27943 38.6696ZM10.2082 41.8542H38.7917V39.8125H10.2082V41.8542ZM38.7917 41.8542C40.4442 41.8542 41.946 40.4826 41.7204 38.6696L39.6943 38.9217C39.7472 39.3468 39.3941 39.8125 38.7917 39.8125V41.8542ZM41.7204 38.6696C40.8668 31.81 36.0131 26.1964 29.568 24.2311L28.9727 26.1842C34.6595 27.9182 38.9417 32.8745 39.6943 38.9217L41.7204 38.6696Z"
              fill="black"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_2003_117"
          x="5.38187"
          y="7.14584"
          width="38.2361"
          height="38.4583"
          filterUnits="userSpaceOnUse"
          color-interpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.875" />
          <feGaussianBlur stdDeviation="0.9375" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2003_117"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2003_117"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_2003_117">
          <rect width="49" height="49" fill="white" />
        </clipPath>
      </defs>
    </MotionSvg>
  );
};

export default ProfileDashboardIcon;
