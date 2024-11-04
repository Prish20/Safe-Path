// hooks/useImageUpload.ts
import { useState, ChangeEvent } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

interface SelectedFile {
  file: File;
  preview: string;
}

const useImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [imageUploadProgress, setImageUploadProgress] = useState<
    Record<string, number>
  >({});
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleUploadImage = async (fileData: SelectedFile, index: number) => {
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

  return {
    selectedFiles,
    handleFileChange,
    handleClearImage,
    handleUploadImage,
    imageUploadProgress,
    imageUploadError,
    uploadedImages,
    setUploadedImages,
  };
};

export default useImageUpload;
