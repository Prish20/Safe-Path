// components/UploadedImagesGallery.tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface UploadedImagesGalleryProps {
  uploadedImages: string[];
  currentPage: number;
  imagesPerPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

const UploadedImagesGallery = ({ uploadedImages, currentPage, imagesPerPage, setCurrentPage }: UploadedImagesGalleryProps) => {
  return (
    <div className="w-full flex-1 bg-gray-800/20 mt-4 rounded-lg p-4 overflow-y-auto">
      <h2 className="text-green-500 text-lg font-bold uppercase mb-4">Uploaded Images</h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-4">
        {uploadedImages
          .slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage)
          .map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
      </div>

      {uploadedImages.length > imagesPerPage && (
        <Pagination>
          <PaginationContent className="flex justify-center">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`cursor-pointer hover:bg-gray-700 ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
              />
            </PaginationItem>

            {Array.from({ length: Math.ceil(uploadedImages.length / imagesPerPage) }).map((_, i) => (
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
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(uploadedImages.length / imagesPerPage)))
                }
                className={`cursor-pointer hover:bg-gray-700 ${
                  currentPage === Math.ceil(uploadedImages.length / imagesPerPage) ? "opacity-50 pointer-events-none" : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default UploadedImagesGallery;
