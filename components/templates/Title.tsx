import { Constants } from "@/classes/Constants";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface TitleProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const Title: React.FC<TitleProps> = ({ onClick, size = 200 }) => (
  <div className="flex justify-center items-center text-center gap-3">
    <p className="text-3xl text-blue_light font-semibold">
      {Constants.ProjTitle1}
    </p>
    <p className="text-3xl text-blue font-normal">{Constants.ProjTitle2}</p>
  </div>
);

export default Title;
