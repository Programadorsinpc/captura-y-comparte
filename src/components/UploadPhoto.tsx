import { useState } from "react";
import { storage, firestore, auth } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const UploadPhoto = () => {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `photos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress); // Actualiza el progreso de la subida
      },
      (error) => {
        console.error("Error al subir la imagen: ", error);
      },
      () => {
        // Obtener URL de descarga después de que la subida esté completa
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          try {
            await addDoc(collection(firestore, "photos"), {
              url,
              createdAt: Timestamp.now(),
              userId: user?.uid,
              userEmail: user?.email,
              likes: 0, 
              comments: [], 
            });
            setFile(null);
            setProgress(0);
            console.log("Foto subida exitosamente!");
          } catch (error) {
            console.error("Error al guardar la imagen en Firestore: ", error);
          }
        });
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" onChange={handleFileChange} />
      {progress > 0 && <p>Progreso: {progress}%</p>}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
      >
        Subir Foto
      </button>
    </div>
  );
};

export default UploadPhoto;
