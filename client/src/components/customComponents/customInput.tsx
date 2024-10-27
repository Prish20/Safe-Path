// components/CustomInput.jsx
import { Input } from "@/components/ui/input";
import { Slot } from "@radix-ui/react-slot";
import { InputHTMLAttributes, ReactNode } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function CustomInput({
  icon,
  iconPosition = "left",
  className,
  ...props
}: CustomInputProps) {
  const iconWrapperClasses =
    iconPosition === "left" ? "left-4 top-1/2  -translate-y-1/2" : "right-2 top-1/2 -translate-y-1/2";
  const inputPaddingClass = iconPosition === "left" ? "pl-11" : "pr-11";

  return (
    <div className="relative">
      {icon && (
        <Slot
          className={`absolute inset-y-0 ${iconWrapperClasses} flex items-center pointer-events-none`}
        >
          {icon}
        </Slot>
      )}
      <Input className={`${inputPaddingClass} ${className}`} {...props} />
    </div>
  );
}
