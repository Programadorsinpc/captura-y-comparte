// services/notificationService.ts
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

// Obtener notificaciones de un usuario
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserNotifications = (userId: string, callback: (notifications: any[]) => void) => {
  const q = query(collection(firestore, "notifications"), where("userId", "==", userId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(notifications);
  });

  return unsubscribe;
};

// Eliminar una notificación
export const deleteNotification = async (id: string) => {
  try {
    await deleteDoc(doc(firestore, "notifications", id));
    console.log("Notificación eliminada");
  } catch (error) {
    console.error("Error al eliminar la notificación: ", error);
  }
};
