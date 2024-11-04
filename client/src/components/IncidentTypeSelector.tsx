// components/IncidentTypeSelector.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IncidentTypeSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const IncidentTypeSelector = ({
  onChange,
  error,
}: IncidentTypeSelectorProps) => {
  return (
    <div className="flex flex-col w-full sm:w-1/2">
      <Select onValueChange={onChange}>
        <SelectTrigger className=" h-10 border text-white/30 border-gray-800 rounded-md bg-gray-900">
          <SelectValue placeholder="Incident Type" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border border-gray-800 rounded-md text-white/30 hover:text-white">
          <SelectItem value="accident">Accident</SelectItem>
          <SelectItem value="theft">Theft</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default IncidentTypeSelector;
