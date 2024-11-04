// hooks/useFormValidation.ts
import { useState } from "react";

// Add this interface at the top
interface FormData {
  type: string;
  description: string;
  location: string;
}

const useFormValidation = (formData: FormData) => {
  const [errors, setErrors] = useState<FormData>({
    type: "",
    description: "",
    location: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      type: "",
      description: "",
      location: "",
    };

    if (!formData.type) {
      newErrors.type = "Please select an incident type";
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return { errors, validateForm, setErrors };
};

export default useFormValidation;
