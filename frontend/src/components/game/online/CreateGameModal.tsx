import { useNavigate } from "react-router-dom";
import { Modal } from "./modal";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export function CreateGameModal({ isOpen, onClose }: CreateGameModalProps) {

  const navigate = useNavigate();

  const handelCreateGame = async (mode: string) => {

    try {
      const response = await fetch("http://localhost:8000/rooms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          WordType: "All",
          mode,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        navigate('/WaitingLobby')
  
      } else {
        console.log("Error: ", await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-6">
        <div>
          <p className="mt-2 text-lg">Language: English</p>
        </div>

        <h2 className="text-2xl font-bold">Create new game</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-green-600">✓</span>
            <p>100+ words</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handelCreateGame("public");
              onClose();
            }}
          >
            Public
          </button>
          <button
            className="w-full border border-blue-500 text-blue-500 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handelCreateGame("private");
              onClose();
            }}
          >
            Private
          </button>
        </div>
      </div>
    </Modal>
  );
}
