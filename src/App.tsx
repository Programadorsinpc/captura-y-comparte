import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth";
import Gallery from "./components/Gallery"; // Crearemos esta componente a continuación
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";

function App() {
  const [user, loading] = useAuthState(auth); // Hook para observar el estado de autenticación

  if (loading) {
    return <p>Cargando...</p>; // Puedes reemplazar esto con un spinner de carga si deseas
  }

  return (
    <Router>
      <Routes>
        {/* Redirigimos a la galería si el usuario ya está autenticado */}
        <Route
          path="/auth"
          element={user ? <Navigate to="/gallery" /> : <Auth />}
        />
        {/* Ruta protegida, solo accesible si el usuario está autenticado */}
        <Route
          path="/gallery"
          element={user ? <Gallery /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
