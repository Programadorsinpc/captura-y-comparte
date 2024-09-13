import React, { useState, useEffect } from "react";
import { getUserNotifications } from "../../services/notificationService";
import NotificationItem from "./NotificationItem";

interface NotificationListProps {
  userId: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<
    Array<{ id: string; message: string }>
  >([]);

  useEffect(() => {
    const unsubscribe = getUserNotifications(userId, setNotifications);
    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="mt-4">
      <h3 className="font-bold">Notificaciones:</h3>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              message={notification.message}
            />
          ))}
        </ul>
      ) : (
        <p>No tienes notificaciones.</p>
      )}
    </div>
  );
};

export default NotificationList;
