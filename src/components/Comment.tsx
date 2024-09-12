import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, addDoc, collection } from "firebase/firestore";
import { firestore, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

interface CommentProps {
  photoId: string;
  ownerId: string;  // Agregar el userId del propietario de la foto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments?: Array<any>;
}

// Función para agregar notificaciones
const addNotification = async (ownerId: string, message: string) => {
  try {
    await addDoc(collection(firestore, "notifications"), {
      userId: ownerId,
      message,
      timestamp: new Date(),
    });
    console.log("Notificación enviada");
  } catch (error) {
    console.error("Error al agregar notificación: ", error);
  }
};

const AddComment: React.FC<CommentProps> = ({ photoId, ownerId }) => {
  const [comment, setComment] = useState("");
  const [user] = useAuthState(auth);

  const handleCommentSubmit = async () => {
    if (!comment || !user) return; // Asegurar que haya un comentario y que el usuario esté autenticado

    const photoRef = doc(firestore, "photos", photoId);
    try {
      await updateDoc(photoRef, {
        comments: arrayUnion({
          text: comment,
          userId: user.uid,
          userEmail: user.email,
          createdAt: new Date(),
        }),
      });

      setComment(""); // Limpiar el campo de comentarios
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

const CommentsSection: React.FC<CommentProps> = ({ photoId, comments }) => {
  const [user] = useAuthState(auth);

  // Función para eliminar un comentario
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteComment = async (comment: any) => {
    const photoRef = doc(firestore, "photos", photoId);
    try {
      await updateDoc(photoRef, {
        comments: arrayRemove(comment),
      });
      console.log("Comentario eliminado!");
    } catch (error) {
      console.error("Error al eliminar comentario: ", error);
    }
  };

  return (
    <div className="mt-4">
      {comments && comments.length > 0 && (
        <div>
          <h3 className="font-bold">Comentarios:</h3>
          {comments.map((comment, index) => (
            <div
              key={index}
              className="bg-white p-2 mt-2 rounded-lg flex justify-between"
            >
              <div>
                <p>
                  <strong>{comment.userEmail}</strong>: {comment.text}
                </p>
              </div>
              {user?.uid === comment.userId && (
                <button
                  onClick={() => handleDeleteComment(comment)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { AddComment, CommentsSection };
