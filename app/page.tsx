"use client";

import { montserratFont } from "@/styles/fonts";
import "react-toastify/dist/ReactToastify.css";
import { twMerge } from "tailwind-merge";
import Tailwind_Wrapper from "./templates/Tailwind_Wrapper";

export default function Home() {
  return (
    <div className={twMerge("w-full h-full bg-bg text-text", montserratFont)}>
      <Tailwind_Wrapper />
    </div>
  );
}
