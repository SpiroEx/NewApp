interface RadioChooserProps<T extends "single" | "multiple"> {
  color?: string;
  type?: T;
  value: T extends "single" ? string : string[];
  options: readonly string[];
}

const RadioChooser = <T extends "single" | "multiple">({
  color = "",
  type = "single" as T,
  value,
  options,
}: RadioChooserProps<T>) => {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <div className="flex flex-col gap-3" key={option}>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green"></div>
            <p className="text-base font-light">{option}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioChooser;
