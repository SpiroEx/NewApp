import { InputField } from "@/hooks/useInputField";
import { outfitFont } from "@/styles/fonts";
import { ChangeEventHandler, RefObject } from "react";
import { twMerge } from "tailwind-merge";

interface MyInputProps {
  type?: "text" | "number" | "email" | "password"; // Add more types as needed
  placeholder?: string;
  inputField: InputField;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  dark?: boolean;
  className?: string;
  divClassName?: string;
  defaultValue?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  label?: string;
  disabled?: boolean;
}

const MyInput: React.FC<MyInputProps> = ({
  type = "text",
  placeholder,
  inputField,
  onChange,
  className,
  divClassName,
  defaultValue,
  onFocus,
  onBlur,
  maxLength,
  label,
  disabled = false,
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col",
        disabled && "opacity-50",
        divClassName
      )}
    >
      {label && <p className="">{label}</p>}
      <div className="flex justify-center">
        <input
          ref={inputField.ref as RefObject<HTMLInputElement>}
          step="any"
          disabled={disabled}
          maxLength={maxLength}
          className={twMerge(
            "w-full max-w-sm rounded-lg border p-4",
            outfitFont,
            inputField.error ? "border-red-500" : "border-input_border",
            className
          )}
          type={type}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
            inputField.setError(false);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};

export default MyInput;
