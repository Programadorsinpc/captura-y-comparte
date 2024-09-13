import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { handleDeletePhoto, handleLike } from "../../services/photoService";
import AddComment from "../Comments/AddComment";
import CommentsSection from "../Comments/CommentSection";


// Componente de la tarjeta de foto individual
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PhotoCard = ({ photo, onClickImage }: { photo: any, onClickImage: () => void }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="w-full h-auto bg-gray-300 rounded-lg overflow-hidden relative p-4">
      <img
        src={photo.url}
        alt="Foto subida"
        className="object-cover w-full h-64"
        onClick={onClickImage}
      />
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handleLike(photo.id, photo.likes, photo.userId, user!)}
          className="text-blue-500 hover:text-blue-700"
        >
          👍 {photo.likes}
        </button>
        {user?.uid === photo.userId && (
          <button
            onClick={() => handleDeletePhoto(photo.id, photo.url)}
            className="text-red-500 hover:text-red-700"
          >
            Eliminar
          </button>
        )}
      </div>
      <AddComment photoId={photo.id} ownerId={photo.userId} />
      <CommentsSection
        photoId={photo.id}
        comments={photo.comments || []}
        ownerId={photo.userId}
      />
    </div>
  );
};

export default PhotoCard;
