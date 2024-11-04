// components/DescriptionInput.tsx
import { Textarea } from "@/components/ui/textarea";

interface DescriptionInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const DescriptionInput = ({
  value,
  onChange,
  error,
}: DescriptionInputProps) => {
  return (
    <div className="flex flex-col">
      <Textarea
        className={`h-64 bg-gray-900 border border-gray-800 rounded-md focus:ring-emerald-500 w-full ${
          error ? "border-red-500" : ""
        }`}
        placeholder="Add a description for the incident"
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default DescriptionInput;
