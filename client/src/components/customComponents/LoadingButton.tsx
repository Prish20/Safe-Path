// LoadingButton.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface LoadingButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  disabled,
  onClick,
  children,
  className,
  type = "button",
}) => {
  return (
    <Button
      size="lg"
      type={type}
      className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform ${
        !isLoading && !disabled
          ? "hover:shadow-emerald-600 hover:-translate-y-1"
          : ""
      } ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin mr-2 w-5 h-5" />
          {children}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
