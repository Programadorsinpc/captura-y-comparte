import { useAuthState } from "react-firebase-hooks/auth";
import { deleteComment } from "../../services/commentService";
import { auth } from "../../services/firebaseConfig";

interface CommentProps {
  photoId: string;
  ownerId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments?: Array<any>;
}

const CommentsSection: React.FC<CommentProps> = ({ photoId, comments }) => {
  const [user] = useAuthState(auth);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteComment = async (comment: any) => {
    try {
      await deleteComment(photoId, comment);
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

export default CommentsSection;
