import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomInput } from "@/components/customComponents/customInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";
import MapNavigation from "./MapNavigation";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../../firebase";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

// Add type for user state
interface UserState {
  currentUser: {
    _id: string;
    // ... other user properties
  } | null;
}

// Update RootState interface if not already defined elsewhere
interface RootState {
  user: UserState;
}

const IncidentReporting = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: "",
    image: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<
    { file: File; preview: string }[]
  >([]);
  const [imageUploadProgress, setImageUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    type: "",
    description: "",
    location: "",
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        setImageUploadError("Each file must be less than 2MB");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setSelectedFiles((prev) => [...prev, { file, preview: previewUrl }]);
    });
  };

  const handleClearImage = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUploadImage = async (
    fileData: { file: File; preview: string },
    index: number
  ) => {
    try {
      const { file } = fileData;

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, `incident-images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress((prev) => ({
            ...prev,
            [fileName]: Number(progress.toFixed(0)),
          }));
        },
        (error) => {
          console.error("Upload error:", error);
          setImageUploadError("Upload failed for " + file.name);
          setImageUploadProgress((prev) => ({ ...prev, [fileName]: 0 }));
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadedImages((prev) => [...prev, downloadURL]);
          setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
          setImageUploadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[fileName];
            return newProgress;
          });
        }
      );
    } catch (error) {
      setImageUploadError("Upload failed");
      console.error("Upload error:", error);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSubmit = {
      ...formData,
      reportedBy: user?._id,
      images: uploadedImages,
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
      setFormData({
        type: "",
        description: "",
        location: "",
        image: "",
      });
      setUploadedImages([]);
    } catch (error) {
      console.log(
        "Failed to report incident:",
        error instanceof Error ? error.message : "Unknown error"
      );
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
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center">
            <div className="flex flex-col w-full sm:w-1/2">
              <Select
                onValueChange={(value) => {
                  setFormData({ ...formData, type: value });
                  setErrors({ ...errors, type: "" });
                }}
              >
                <SelectTrigger className=" h-10 border text-white/30 border-gray-800 rounded-md bg-gray-900">
                  <SelectValue placeholder="Incident Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-800 rounded-md text-white/30 hover:text-white">
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="theft">Theft</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <span className="text-red-500 text-xs mt-1">{errors.type}</span>
              )}
            </div>

            <div className="flex flex-col w-full sm:w-1/2">
              <CustomInput
                aria-label="Location"
                icon={<MapPin />}
                iconPosition="left"
                iconClassName="text-green-500 pr-1"
                className={`h-10 bg-gray-900 border border-gray-800 rounded-md focus:ring-emerald-500 w-full ${
                  errors.location ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Location"
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setErrors({ ...errors, location: "" });
                }}
              />
              {errors.location && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.location}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <Textarea
              className={`h-64 bg-gray-900 border border-gray-800 rounded-md focus:ring-emerald-500 w-full ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Add a description for the incident"
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setErrors({ ...errors, description: "" });
              }}
            />
            {errors.description && (
              <span className="text-red-500 text-xs mt-1">
                {errors.description}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 flex-col sm:flex-row items-center justify-center border-2 border-green-500 border-dotted p-3">
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="text-sm text-white/70 w-full"
                />
              </div>
            </div>

            {/* Preview Section */}
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {selectedFiles.map((fileData, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={fileData.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUploadImage(fileData, index)}
                        className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
                        disabled={!!imageUploadProgress[fileData.file.name]}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClearImage(index)}
                        className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    {imageUploadProgress[fileData.file.name] && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-sm py-1">
                        {imageUploadProgress[fileData.file.name]}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {imageUploadError && (
              <div className="text-red-500 text-sm mt-2">
                {imageUploadError}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform hover:shadow-emerald-600 hover:-translate-y-1"
          >
            Submit Reported Incident
          </Button>
        </div>
      </form>
      <div className="flex flex-col w-full lg:w-1/2 items-center rounded-lg">
        <div className="w-full h-[300px] sm:h-[400px]">
          <MapNavigation />
        </div>
        <div className="w-full flex-1 bg-gray-800/20 mt-4 rounded-lg p-4 overflow-y-auto">
          <h2 className="text-green-500 text-lg font-bold uppercase mb-4">
            Uploaded Images
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-4">
            {uploadedImages
              .slice(
                (currentPage - 1) * imagesPerPage,
                currentPage * imagesPerPage
              )
              .map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
          </div>

          {uploadedImages.length > imagesPerPage && (
            <Pagination>
              <PaginationContent className="flex justify-center">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={`cursor-pointer hover:bg-gray-700 ${
                      currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                    }`}
                  />
                </PaginationItem>

                {Array.from({
                  length: Math.ceil(uploadedImages.length / imagesPerPage),
                }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer hover:bg-gray-700"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(uploadedImages.length / imagesPerPage)
                        )
                      )
                    }
                    className={`cursor-pointer hover:bg-gray-700 ${
                      currentPage ===
                      Math.ceil(uploadedImages.length / imagesPerPage)
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </main>
  );
};

export default IncidentReporting;
