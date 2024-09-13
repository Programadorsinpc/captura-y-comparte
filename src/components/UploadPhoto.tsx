// src/components/UploadPhoto.tsx
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import { savePhotoToFirestore, uploadPhotoToStorage } from "../services/photoService";

const UploadPhoto = () => {
  const [user] = useAuthState(auth); // Obtener el usuario autenticado
  const [file, setFile] = useState<File | null>(null); // Estado del archivo seleccionado
  const [progress, setProgress] = useState<number>(0); // Estado del progreso de la subida

  // Manejar cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]); // Guardar archivo seleccionado en el estado
    }
  };

  // Manejar la subida de archivos
  const handleUpload = async () => {
    if (!file) return; // Si no hay archivo, salir de la función

    try {
      // Llamar al servicio para subir la foto a Firebase Storage
      const url = await uploadPhotoToStorage(file, setProgress);

      // Llamar al servicio para guardar la URL en Firestore
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
      {/* Campo para seleccionar el archivo */}
      <input type="file" onChange={handleFileChange} />

      {/* Mostrar progreso si es mayor a 0 */}
      {progress > 0 && <p>Progreso: {progress}%</p>}

      {/* Botón para subir la foto */}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
        disabled={!file} // Deshabilitar si no hay archivo seleccionado
      >
        Subir Foto
      </button>
    </div>
  );
};

export default UploadPhoto;
