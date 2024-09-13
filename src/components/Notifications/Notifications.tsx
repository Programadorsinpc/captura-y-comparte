import { useAuthState } from "react-firebase-hooks/auth";
import NotificationList from "./NotificationList";
import { auth } from "../../services/firebaseConfig";

const Notifications = () => {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div>
      <NotificationList userId={user.uid} />
    </div>
  );
};

export default Notifications;
