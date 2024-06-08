import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

//! TITLE
const title: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={twMerge("text-3xl tracking-widest font-light", className)}
      {...props}
    >
      {children}
    </p>
  );
};

//! SECTION
const section: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={twMerge("text-base tracking-wider font-bold", className)}
      {...props}
    >
      {children}
    </p>
  );
};

//! P
const _p: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={twMerge(
        "text-base font-light tracking-wide opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

//! NUMBER
const number: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={twMerge("text-2xl tracking-wider font-normal", className)}
      {...props}
    >
      {children}
    </p>
  );
};

const Txt = {
  title,
  section,
  p: _p,
  number,
};

export default Txt;
