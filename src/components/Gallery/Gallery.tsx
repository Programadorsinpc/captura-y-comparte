import { useState } from "react";
import { usePhotos } from "../../hooks/usePhotos";
import UploadPhoto from "../Upload/UploadPhoto";
import PhotoModal from "../Commons/PhotoModal";
import PhotoCard from "./PhotoCard";

// Componente principal de la Galería
const Gallery = () => {
  const photos = usePhotos();
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen w-full bg-home-background">
      <header className="bg-gray-800 p-4">
        <h1 className="text-3xl font-bold text-white">Galería de Fotos</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start p-4">
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
      </main>

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
