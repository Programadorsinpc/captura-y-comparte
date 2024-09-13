// services/photoService.ts
import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { firestore, storage } from "./firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { User } from "firebase/auth";

// Función para subir fotos a firebase
export const uploadPhotoToStorage = (
  file: File,
  onProgress: (progress: number) => void
) => {
  return new Promise<string>((resolve, reject) => {
    const storageRef = ref(storage, `photos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress(progress);
      },
      (error) => {
        console.error("Error uploading file: ", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export const savePhotoToFirestore = async (
  url: string,
  userId: string | undefined,
  userEmail: string | null | undefined
) => {
  try {
    await addDoc(collection(firestore, "photos"), {
      url,
      createdAt: Timestamp.now(),
      userId,
      userEmail,
      likes: 0,
      comments: [],
    });
  } catch (error) {
    console.error("Error saving to Firestore: ", error);
    throw error;
  }
};

// Función para enviar notificaciones
export const addNotification = async (ownerId: string, message: string) => {
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

// Función para manejar los likes

export const handleLike = async (
  photoId: string,
  currentLikes: number,
  ownerId: string,
  user: User
) => {
  const photoRef = doc(firestore, "photos", photoId);
  try {
    await updateDoc(photoRef, {
      likes: currentLikes + 1,
    });
    console.log("Like agregado!");

    if (user.uid !== ownerId) {
      await addNotification(ownerId, `${user.email} ha dado like a tu foto.`);
    }
  } catch (error) {
    console.error("Error al dar like: ", error);
  }
};

// Función para eliminar una foto
export const handleDeletePhoto = async (photoId: string, photoUrl: string) => {
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
