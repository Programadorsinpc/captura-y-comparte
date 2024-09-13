import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebaseConfig";
import Home from "./pages/Home";
import Spinner from "./components/Commons/Spinner";

function App() {
  const [user, loading] = useAuthState(auth); // Hook para observar el estado de autenticación

  if (loading) {
    return <Spinner />;
  }

  return (
    <Router>
      <Routes>
        {/* Redirige automáticamente a /auth o /home según el estado de autenticación */}
        <Route path="/" element={<Navigate to={user ? "/home" : "/auth"} />} />

        {/* Ruta de autenticación */}
        <Route
          path="/auth"
          element={user ? <Navigate to="/home" /> : <Auth />}
        />

        {/* Ruta protegida, solo accesible si el usuario está autenticado */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
