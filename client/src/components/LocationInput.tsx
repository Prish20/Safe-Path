// components/LocationInput.tsx
import { CustomInput } from "@/components/customComponents/customInput";
import { MapPin } from "lucide-react";

interface LocationInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const LocationInput = ({ value, onChange, error }: LocationInputProps) => {
  return (
    <div className="flex flex-col w-full sm:w-1/2">
      <CustomInput
        aria-label="Location"
        icon={<MapPin />}
        iconPosition="left"
        iconClassName="text-green-500 pr-1"
        className={`h-10 bg-gray-900 border border-gray-800 rounded-md focus:ring-emerald-500 w-full ${
          error ? "border-red-500" : ""
        }`}
        type="text"
        placeholder="Location"
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default LocationInput;
