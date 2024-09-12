import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore"; // Añadir updateDoc y doc
import { firestore, auth, storage } from "../firebaseConfig";
import UploadPhoto from "./UploadPhoto";
import { signOut } from "firebase/auth";
import { AddComment, CommentsSection } from "./Comment";
import PhotoModal from "./PhotoModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteObject, ref } from "firebase/storage";
import Navbar from "./NavBar";

const addNotification = async (ownerId: string, message: string) => {
  try {
    await addDoc(collection(firestore, "notifications"), {
      userId: ownerId,
      message,
      timestamp: new Date(),
    });
    console.log("Notificación enviada");
  } catch (error) {
    console.error("Error al agregar notificación: ", error);
  }
};

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

  const handleLike = async (
    photoId: string,
    currentLikes: number,
    ownerId: string
  ) => {
    const photoRef = doc(firestore, "photos", photoId);
    try {
      await updateDoc(photoRef, {
        likes: currentLikes + 1,
      });
      console.log("Like agregado!");
      // Si el usuario que da like no es el propietario, envía una notificación
      if (user?.uid !== ownerId) {
        await addNotification(
          ownerId,
          `${user?.email} ha dado like a tu foto.`
        );
      }
    } catch (error) {
      console.error("Error al dar like: ", error);
    }
  };

  const handleDeletePhoto = async (photoId: string, photoUrl: string) => {
    try {
      const photoRef = doc(firestore, "photos", photoId);
      await deleteDoc(photoRef);

      const imageRef = ref(storage, photoUrl);
      await deleteObject(imageRef);

      console.log("Foto eliminada correctamente!");
    } catch (error) {
      console.error("Error al eliminar foto: ", error);
    }
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) =>
      console.error("Error al cerrar sesión: ", error)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Galería de Fotos</h1>
      <UploadPhoto />
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
      >
        Cerrar sesión
      </button>

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
                onClick={() => handleLike(photo.id, photo.likes, photo.userId)}
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

            {/* Sección de comentarios */}
            <AddComment photoId={photo.id} ownerId={photo.userId} />

            <CommentsSection
              photoId={photo.id}
              comments={photo.comments || []}
              ownerId={photo.userId}
            />
          </div>
        ))}
      </div>

      {/* Modal de foto ampliada */}
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
