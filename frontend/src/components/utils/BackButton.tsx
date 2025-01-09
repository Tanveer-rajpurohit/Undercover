import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ onLeave }: { onLeave: () => void }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLeaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmation(true); // Show confirmation dialog
    
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Close confirmation dialog
  };

  const handleConfirmLeave = () => {
    setShowConfirmation(false); // Close confirmation dialog
    onLeave(); // Proceed with leaving the room
  };

  return (
    <>
      <button
        onClick={handleLeaveClick}
        className="bg-sky-400 rounded-full border-4 border-[#f1f2f6] p-2"
      >
        <ArrowLeft className="w-7 h-7 text-white" />
      </button>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">Are you sure you want to leave the game?</p>
            <div className="mt-4 flex justify-between gap-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLeave}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackButton;
