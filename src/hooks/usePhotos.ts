import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";

// Hook personalizado para obtener las fotos desde Firebase
export const usePhotos = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [photos, setPhotos] = useState<Array<any>>([]);

  useEffect(() => {
    const q = query(collection(firestore, "photos"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(photoList);
    });

    return () => unsubscribe();
  }, []);

  return photos;
};
