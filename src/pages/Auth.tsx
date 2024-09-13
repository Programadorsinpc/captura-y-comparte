import { useState } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
} from "../services/authService";
import AuthForm from "../components/Login/AuthForm";
import GoogleSignInButton from "../components/Login/GoogleSignIn";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      if (isLogin) {
        await loginWithEmail(email, password);
        console.log("Usuario autenticado con éxito.");
      } else {
        await registerWithEmail(email, password);
        console.log("Usuario registrado con éxito.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      console.log("Inicio de sesión con Google exitoso");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      setError("Error: Se ha cerrado la ventana de inicio de sesión");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-auth-background">
      <AuthForm
        isLogin={isLogin}
        handleAuth={handleAuth}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword} // Pasar estado de confirmación
        error={error}
      />
      <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
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
