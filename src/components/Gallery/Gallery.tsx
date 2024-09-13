import { useState } from "react";
import { usePhotos } from "../../hooks/usePhotos";
import UploadPhoto from "../UploadPhoto";
import PhotoModal from "../PhotoModal";
import PhotoCard from "./PhotoCard";

// Componente principal de la Galería
const Gallery = () => {
  const photos = usePhotos();
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-home-background">
      <h1 className="text-3xl font-bold mb-4 text-white">Galería de Fotos</h1>
      <UploadPhoto />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClickImage={() => setSelectedPhotoUrl(photo.url)}
          />
        ))}
      </div>

      {selectedPhotoUrl && (
        <PhotoModal
          isOpen={!!selectedPhotoUrl}
          photoUrl={selectedPhotoUrl}
          onClose={() => setSelectedPhotoUrl(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
