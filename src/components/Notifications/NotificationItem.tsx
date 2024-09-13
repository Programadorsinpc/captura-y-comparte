import React from "react";
import { deleteNotification } from "../../services/notificationService";

interface NotificationItemProps {
  id: string;
  message: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ id, message }) => {
  const handleDelete = () => {
    deleteNotification(id);
  };

  return (
    <li className="bg-white p-2 mt-2 rounded-lg flex justify-between items-center">
      <span>{message}</span>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-2 py-1 rounded-lg"
      >
        X
      </button>
    </li>
  );
};

export default NotificationItem;
