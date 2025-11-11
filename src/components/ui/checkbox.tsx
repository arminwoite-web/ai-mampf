import * as React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  onCheckedChange,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(event.target.checked);
  };

  return (
    <label className="flex items-center space-x-2">
      <input type="checkbox" onChange={handleChange} {...props} />
      {label && <span>{label}</span>}
    </label>
  );
};
