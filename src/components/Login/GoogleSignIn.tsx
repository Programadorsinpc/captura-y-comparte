interface GoogleSignInButtonProps {
  handleGoogleSignIn: () => void;
}

const GoogleSignInButton = ({
  handleGoogleSignIn,
}: GoogleSignInButtonProps) => {
  return (
    <button
      onClick={handleGoogleSignIn}
      className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg w-80 hover:bg-red-600"
    >
      Iniciar sesión con Google
    </button>
  );
};

export default GoogleSignInButton;
