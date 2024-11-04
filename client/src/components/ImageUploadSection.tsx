// components/ImageUploadSection.tsx
interface FileData {
  file: File;
  preview: string;
}

interface ImageUploadSectionProps {
  selectedFiles: FileData[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearImage: (index: number) => void;
  handleUploadImage: (fileData: FileData, index: number) => void;
  imageUploadProgress: { [key: string]: number };
  imageUploadError?: string;
}

const ImageUploadSection = ({
  selectedFiles,
  handleFileChange,
  handleClearImage,
  handleUploadImage,
  imageUploadProgress,
  imageUploadError,
}: ImageUploadSectionProps) => {
  return (
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
        <div className="text-red-500 text-sm mt-2">{imageUploadError}</div>
      )}
    </div>
  );
};

export default ImageUploadSection;
