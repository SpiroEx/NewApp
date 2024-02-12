"use client";

import { outfitFont } from "@/styles/fonts";
import "react-toastify/dist/ReactToastify.css";
import { twMerge } from "tailwind-merge";
import ConstantsWrapper from "./templates/Constants_Wrapper";

export default function Home() {
  return (
    <div className={twMerge("w-full h-full", outfitFont)}>
      <ConstantsWrapper />
    </div>
  );
}
