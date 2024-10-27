// PasswordInput.tsx
import React from "react";
import { CustomInput } from "@/components/customComponents/customInput";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  ariaLabel?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
  error,
  disabled,
  placeholder,
  ariaLabel,
}) => {
  return (
    <div className="relative mt-4">
      <CustomInput
        icon={<LockKeyhole className="text-emerald-500" />}
        iconPosition="left"
        placeholder={placeholder || label}
        aria-label={ariaLabel || label}
        type={showPassword ? "text" : "password"}
        className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <button
        type="button"
        aria-label={`Toggle ${label} visibility`}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
        onClick={toggleShowPassword}
        disabled={disabled}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
