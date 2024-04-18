import tailwindTheme from "../../preval/tailwind.preval";
import { createContext, useCallback } from "react";
import ConstantsWrapper from "./Constants_Wrapper";

export const TailwindContext = createContext({
  getColor: {} as (color: string) => string | undefined,
});

interface Tailwind_WrapperProps {}

const Tailwind_Wrapper: React.FC<Tailwind_WrapperProps> = ({}) => {
  const getColor = useCallback(
    (color: string) => {
      return tailwindTheme?.colors?.[color]?.toString();
    },
    [tailwindTheme]
  );

  return (
    <TailwindContext.Provider
      value={{
        getColor,
      }}
    >
      <ConstantsWrapper />
    </TailwindContext.Provider>
  );
};

export default Tailwind_Wrapper;
