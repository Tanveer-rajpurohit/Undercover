import { useContext } from "react";
import { Modal } from "./modal";
import SocketContext from "../../../context/SocketContext";
import { useNavigate } from "react-router-dom";

interface JoinGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameDetails: {
    hostLevel: number;
    standardWords: number;
    premiumWords: number;
    hostName: string;
    roomCode: string;
  };
}

export function JoinGameModal({
  isOpen,
  onClose,
  gameDetails,
}: JoinGameModalProps) {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const roomCode = gameDetails.roomCode;

  const handelJoinGame = () => {
    const token = localStorage.getItem('authToken');
 
    // Emit 'joinRoom' event to the server
    socket.emit('joinRoom', { roomCode, token });

    // Listen for success or error messages from the server
    socket.on('joinRoomSuccess', () => {
      onClose(); 
      navigate('/waitinglobby')
    
    });

    socket.on('joinRoomError', () => {
      console.log("error");
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-6">
        <div>
          <img
            src="/placeholder.svg?height=48&width=48"
            alt="UK flag"
            className="w-12 h-12 mx-auto rounded-xl"
          />
          <p className="mt-2 text-lg">Language: English</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">
            Join {gameDetails.hostName}'s game?
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                LV
              </span>
              <p className="text-pink-500">
                The Host is Level {gameDetails.hostLevel}
              </p>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-600">✓</span>
              <p>{gameDetails.standardWords} standard words</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handelJoinGame();
              onClose();
            }}
          >
            Join
          </button>
          <button
            className="w-full border border-pink-500 text-pink-500 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
