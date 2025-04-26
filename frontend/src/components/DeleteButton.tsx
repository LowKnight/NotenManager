import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition"
      title="Fach löschen"
    >
      <span className="text-red-600 text-xl">🗑️</span>
    </button>
  );
};

export default DeleteButton;
