import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "../firebaseConfig";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [user] = useAuthState(auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notifications, setNotifications] = useState<Array<any>>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "notifications"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsList = snapshot.docs.map((doc) => doc.data());
      setNotifications(notificationsList);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="mt-4">
      <h3 className="font-bold">Notificaciones:</h3>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="bg-white p-2 mt-2 rounded-lg">
              {notification.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes notificaciones.</p>
      )}
    </div>
  );
};

export default Notifications;
