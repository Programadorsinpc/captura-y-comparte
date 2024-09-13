import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import {
  savePhotoToFirestore,
  uploadPhotoToStorage,
} from "../../services/photoService";
import FileInput from "./FileInput";
import UploadProgress from "./UploadProgress";

const UploadPhoto = () => {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const url = await uploadPhotoToStorage(file, setProgress);
      await savePhotoToFirestore(url, user?.uid, user?.email);

      // Resetear el estado tras la subida
      setFile(null);
      setProgress(0);
      console.log("Foto subida exitosamente!");
    } catch (error) {
      console.error("Error al subir la imagen: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Componente para seleccionar archivo */}
      <FileInput onFileChange={setFile} />

      {/* Componente para mostrar progreso */}
      <UploadProgress progress={progress} />

      {/* Botón para subir la foto */}
      <button
        onClick={handleUpload}
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 ${
          !file && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!file}
      >
        Subir Foto
      </button>
    </div>
  );
};

export default UploadPhoto;
