import tailwindTheme from "../../preval/tailwind.preval";
import { createContext } from "react";
import ConstantsWrapper from "./Constants_Wrapper";

export const TailwindContext = createContext({
  getColor: {} as (
    color: keyof typeof tailwindTheme.extend.colors
  ) => string | undefined,
});

interface Tailwind_WrapperProps {}

const Tailwind_Wrapper: React.FC<Tailwind_WrapperProps> = ({}) => {
  const getColor = (color: keyof typeof tailwindTheme.extend.colors) => {
    return tailwindTheme?.extend?.colors?.[color]?.toString();
  };

  return (
    <TailwindContext
      value={{
        getColor,
      }}
    >
      <ConstantsWrapper />
    </TailwindContext>
  );
};

export default Tailwind_Wrapper;
