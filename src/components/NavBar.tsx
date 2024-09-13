import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import Notifications from "./Notifications"; // Importa el componente de notificaciones
import { handleSignOut } from "../services/authService"; // Importa la función para cerrar sesión

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Estado para manejar el menú de perfil

  return (
    <nav className="bg-blue-500 p-4 w-full flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <Link to="/">Viaje Fotográfico</Link>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <>
            {/* Notificaciones */}
            <div className="relative group">
              <button className="text-white focus:outline-none">
                Notificaciones
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 hidden group-hover:block">
                <Notifications />
              </div>
            </div>

            {/* Perfil */}
            <div className="relative">
              <button
                className="text-white hover:underline"
                onClick={() => setIsProfileOpen(!isProfileOpen)} // Toggle para desplegar la card
              >
                Perfil
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                  <div className="flex flex-col items-center">
                    {/* Foto del usuario */}
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
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
