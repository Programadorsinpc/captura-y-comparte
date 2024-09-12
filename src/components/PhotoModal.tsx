import React from "react";

interface PhotoModalProps {
  isOpen: boolean;
  photoUrl: string;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, photoUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative">
        <img src={photoUrl} alt="Foto ampliada" className="max-w-full max-h-full" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PhotoModal;
