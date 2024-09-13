interface AuthFormProps {
  isLogin: boolean;
  handleAuth: (event: React.FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
}

const AuthForm = ({
  isLogin,
  handleAuth,
  email,
  setEmail,
  password,
  setPassword,
  error,
}: AuthFormProps) => {
  return (
    <form
      onSubmit={handleAuth}
      className="bg-white p-8 rounded-lg shadow-md w-80"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none"
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
          className="border border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="Contraseña"
          required
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
      >
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </button>
    </form>
  );
};

export default AuthForm;
