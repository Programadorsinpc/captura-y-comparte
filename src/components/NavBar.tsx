import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import Notifications from "./Notifications"; // Importa el componente de notificaciones

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <Link to="/">Viaje Fotográfico</Link>
      </div>

      <div className="flex items-center">
        {user && (
          <>
            {/* Mostrar notificaciones solo si el usuario está autenticado */}
            <div className="relative mr-4">
              <button className="text-white">Notificaciones</button>
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                <Notifications />
              </div>
            </div>
            <Link to="/profile" className="text-white">
              Perfil
            </Link>
          </>
        )}
        {!user && (
          <Link to="/login" className="text-white">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
