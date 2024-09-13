// src/pages/Gallery.tsx
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firestore, auth } from "../services/firebaseConfig";
import UploadPhoto from "../components/UploadPhoto";
import PhotoModal from "../components/PhotoModal";
import { useAuthState } from "react-firebase-hooks/auth";
import AddComment from "../components/Comments/AddComment";
import CommentsSection from "../components/Comments/CommentSection";
import { handleDeletePhoto, handleLike } from "../services/photoService";

const Gallery = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [photos, setPhotos] = useState<Array<any>>([]);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(
      collection(firestore, "photos"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(photoList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Galería de Fotos</h1>
      <UploadPhoto />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="w-full h-auto bg-gray-300 rounded-lg overflow-hidden relative p-4"
          >
            <img
              src={photo.url}
              alt="Foto subida"
              className="object-cover w-full h-64"
              onClick={() => setSelectedPhotoUrl(photo.url)}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() =>
                  handleLike(photo.id, photo.likes, photo.userId, photo.email)
                }
                className="text-blue-500 hover:text-blue-700"
              >
                👍 {photo.likes}
              </button>
              {user?.uid === photo.userId && (
                <button
                  onClick={() => handleDeletePhoto(photo.id, photo.url)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              )}
            </div>

            <AddComment photoId={photo.id} ownerId={photo.userId} />
            <CommentsSection
              photoId={photo.id}
              comments={photo.comments || []}
              ownerId={photo.userId}
            />
          </div>
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
