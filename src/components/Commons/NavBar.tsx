import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import Notifications from "../Notifications/Notifications"; 
import { handleSignOut } from "../../services/authService"; 

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Estado para manejar el menú de perfil
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // Estado para manejar el menú de notificaciones

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false); // Asegurarse de que solo uno esté abierto a la vez
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false); // Asegurarse de que solo uno esté abierto a la vez
  };

  return (
    <nav className="bg-blue-500 p-4 w-full flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <Link to="/">Viaje Fotográfico</Link>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <>
            {/* Notificaciones */}
            <div className="relative">
              <button
                className="text-white focus:outline-none"
                onClick={toggleNotifications} // Toggle para abrir/cerrar notificaciones
              >
                Notificaciones
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                  <Notifications />
                </div>
              )}
            </div>

            {/* Perfil */}
            <div className="relative">
              <button
                className="text-white hover:underline"
                onClick={toggleProfile} // Toggle para abrir/cerrar el perfil
              >
                Perfil
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                  <div className="flex flex-col items-center">
                    {/* Foto del usuario */}
                    <img
                      src={user?.photoURL || "/react.svg"}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full mb-2"
                    />
                    {/* Nombre del usuario */}
                    <p className="text-gray-700 font-semibold">
                      {user?.displayName || "Usuario"}
                    </p>
                    {/* Correo electrónico del usuario */}
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {!user && (
          <Link to="/login" className="text-white hover:underline">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
