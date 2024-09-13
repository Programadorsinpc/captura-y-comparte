import { useState } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
} from "../services/authService"; // Importar el servicio

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await loginWithEmail(email, password); // Usar el servicio
        console.log("Usuario autenticado con éxito.");
      } else {
        await registerWithEmail(email, password); // Usar el servicio
        console.log("Usuario registrado con éxito.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle(); // Usar el servicio
      console.log("Inicio de sesión con Google exitoso");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </h2>
      <form onSubmit={handleAuth} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg"
            placeholder="Contraseña"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
      >
        Iniciar sesión con Google
      </button>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 underline"
      >
        {isLogin
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia Sesión"}
      </button>
    </div>
  );
};

export default Auth;
