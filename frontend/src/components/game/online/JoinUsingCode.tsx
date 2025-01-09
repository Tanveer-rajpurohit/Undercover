import { useContext, useState } from "react";
import { Modal } from "./modal";
import SocketContext from "../../../context/SocketContext";
import { useNavigate } from "react-router-dom";

interface JoinUsingCodeProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinUsingCode = ({ isOpen, onClose }: JoinUsingCodeProps) => {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {socket} = useContext(SocketContext)
  const navigate = useNavigate()

  const handleJoinRoom = () => {
    const token = localStorage.getItem('authToken');
 
    // Emit 'joinRoom' event to the server
    socket.emit('joinRoom', { roomCode, token });

    // Listen for success or error messages from the server
    socket.on('joinRoomSuccess', () => {
      
      setError('');
      onClose(); 
      navigate('/waitinglobby')
    
    });

    socket.on('joinRoomError', () => {
      setError("error");
      setSuccessMessage('');
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Join game using Room code</h2>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="space-y-4">
          <div className="flex items-center gap-2 justify-center">
            <input
              onChange={(e) => setRoomCode(e.target.value)}
              type="text"
              value={roomCode}
              className="px-2 py-2 bg-transparent border-2 rounded-lg border-black w-[80%]"
            />
          </div>
        </div>

        <div className="space-y-3">
          <button
            className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors"
            onClick={handleJoinRoom}
          >
            Join
          </button>
          <button
            className="w-full text-pink-500 bg-white py-3 rounded-full font-semibold border-[0.1px] border-pink-600 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default JoinUsingCode;
