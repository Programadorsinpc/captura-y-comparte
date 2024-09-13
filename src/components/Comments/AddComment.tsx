import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addComment, addNotification } from "../../services/commentService";
import { auth } from "../../services/firebaseConfig";

interface CommentProps {
  photoId: string;
  ownerId: string;
}

const AddComment: React.FC<CommentProps> = ({ photoId, ownerId }) => {
  const [comment, setComment] = useState("");
  const [user] = useAuthState(auth);

  const handleCommentSubmit = async () => {
    if (!comment || !user) return;

    const commentData = {
      text: comment,
      userId: user.uid,
      userEmail: user.email,
      createdAt: new Date(),
    };

    try {
      await addComment(photoId, commentData);
      setComment("");
      console.log("Comentario agregado!");

      // Enviar notificación si el usuario que comenta no es el propietario de la foto
      if (user.uid !== ownerId) {
        await addNotification(ownerId, `${user.email} ha comentado en tu foto.`);
      }
    } catch (error) {
      console.error("Error al agregar comentario: ", error);
    }
  };

  return (
    <div className="mt-2">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe un comentario..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded mt-2"
      >
        Comentar
      </button>
    </div>
  );
};

export default AddComment;
