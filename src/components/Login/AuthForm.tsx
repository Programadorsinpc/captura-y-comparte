// src/components/Login/AuthForm.tsx
interface AuthFormProps {
  isLogin: boolean;
  handleAuth: (event: React.FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword?: string; // Hacerlo opcional porque solo se usa en registro
  setConfirmPassword?: (confirmPassword: string) => void;
  error: string;
}

const AuthForm = ({
  isLogin,
  handleAuth,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
}: AuthFormProps) => {
  return (
    <form onSubmit={handleAuth} className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      {!isLogin && (
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword?.(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
      >
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </button>
    </form>
  );
};

export default AuthForm;
