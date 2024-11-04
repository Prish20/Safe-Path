// Import statements (keep only necessary ones)
import { useState } from "react";
import { useSelector } from "react-redux";
import { Label } from "@radix-ui/react-label";
import {} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MapNavigation from "./MapNavigation";

// Define types
interface UserState {
  currentUser: {
    _id: string;
  } | null;
}

interface RootState {
  user: UserState;
}

interface FormData {
  type: string;
  description: string;
  location: string;
  image: string;
}

// Custom Hooks and Components (we'll define them below)
import useFormValidation from "@/hooks/useFormValidation";
import useImageUpload from "@/hooks/useImageUpload";
import IncidentTypeSelector from "@/components/IncidentTypeSelector";
import LocationInput from "@/components/LocationInput";
import DescriptionInput from "@/components/DescriptionInput";
import ImageUploadSection from "@/components/ImageUploadSection";
import UploadedImagesGallery from "@/components/UploadedImagesGallery";

const IncidentReporting = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [formData, setFormData] = useState<FormData>({
    type: "",
    description: "",
    location: "",
    image: "",
  });

  // Custom hooks for validation and image upload
  const { errors, validateForm, setErrors } = useFormValidation(formData);
  const {
    selectedFiles,
    handleFileChange,
    handleClearImage,
    handleUploadImage,
    imageUploadProgress,
    imageUploadError,
    uploadedImages,
    setUploadedImages,
  } = useImageUpload();

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  const getCoordinates = async (location: string) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API;
    const encodedLocation = encodeURIComponent(location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.error("Geocoding API error:", data.status, data.error_message);
        return null;
      }
    } catch (error) {
      console.error("Failed to get coordinates:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert location to coordinates
    const coordinates = await getCoordinates(formData.location);
    if (!coordinates) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Failed to get coordinates for the location",
      }));
      return;
    }

    // Define coordinates as plain numbers, not as a subdocument
    const dataToSubmit = {
      ...formData,
      reportedBy: user?._id,
      images: uploadedImages,
      coordinates: {
        lat: Number(coordinates.lat),
        lng: Number(coordinates.lng)
      }
    };

    try {
      const res = await fetch("/api/incident/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Response status:", res.status);
        console.log("Error message:", data.message);
        return;
      }
      // Reset form data
      setFormData({
        type: "",
        description: "",
        location: "",
        image: "",
      });
      setUploadedImages([]);
    } catch (error) {
      console.log("Failed to report incident:", error);
    }
  };

  return (
    <main className="bg-gray-900 flex flex-col lg:flex-row gap-4 w-full h-full overflow-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/20 w-full lg:w-1/2 text-center rounded-lg p-4"
      >
        <Label className="text-green-500 text-lg font-bold uppercase">
          Report an incident
        </Label>
        <div className="flex flex-col gap-4 mx-2 sm:mx-6 mt-8">
          {/* Incident Type Selector */}
          <IncidentTypeSelector
            value={formData.type}
            onChange={(value) => {
              setFormData({ ...formData, type: value });
              setErrors((prevErrors) => ({ ...prevErrors, type: "" }));
            }}
            error={errors.type}
          />

          {/* Location Input */}
          <LocationInput
            value={formData.location}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
              setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
            }}
            error={errors.location}
          />

          {/* Description Input */}
          <DescriptionInput
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
            }}
            error={errors.description}
          />

          {/* Image Upload Section */}
          <ImageUploadSection
            selectedFiles={selectedFiles}
            handleFileChange={handleFileChange}
            handleClearImage={handleClearImage}
            handleUploadImage={handleUploadImage}
            imageUploadProgress={imageUploadProgress}
            imageUploadError={imageUploadError || undefined}
          />

          <Button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform hover:shadow-emerald-600 hover:-translate-y-1"
          >
            Submit Reported Incident
          </Button>
        </div>
      </form>

      {/* Map and Uploaded Images */}
      <div className="flex flex-col w-full lg:w-1/2 items-center rounded-lg">
        <div className="w-full h-[300px] sm:h-[400px]">
          <MapNavigation />
        </div>
        <UploadedImagesGallery
          uploadedImages={uploadedImages}
          currentPage={currentPage}
          imagesPerPage={imagesPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default IncidentReporting;
