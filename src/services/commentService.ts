import { doc, updateDoc, arrayUnion, arrayRemove, addDoc, collection } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

// Función para agregar un comentario
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addComment = async (photoId: string, commentData: any) => {
  const photoRef = doc(firestore, "photos", photoId);
  return await updateDoc(photoRef, {
    comments: arrayUnion(commentData),
  });
};

// Función para eliminar un comentario
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteComment = async (photoId: string, commentData: any) => {
  const photoRef = doc(firestore, "photos", photoId);
  return await updateDoc(photoRef, {
    comments: arrayRemove(commentData),
  });
};

// Función para agregar notificaciones
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
