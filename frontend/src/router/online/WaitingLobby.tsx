import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import OnlineLobby from "../../components/game/online/waitinglobby/OnlineLobby";
import Chat from "../../components/game/online/Chat";
import PlayGroundContext from "../../context/PlayGround";
import SocketContext from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/utils/BackButton"; // Import the BackButton component
import Call from "../../components/game/online/Call";
import { Headset } from "lucide-react";

interface Chat {
  id: number;
  gameId: number;
  userId: number;
  message: string;
  createdAt: string;
  User: {
    id: number;
    username: string;
    email: string;

  };
}
interface ActiveGame {
  id: number;
  hostId: number;
  players: string;
  status: string;
  roomCode: string;
  roles: null | string;
  createdAt: string;
  WordType: string;
  ChatMessage: Chat[];
}

const WaitingLobby: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const navigate = useNavigate();
  const { game, handelSetGame, setCurrentUserId } =
    useContext(PlayGroundContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      const token = localStorage.getItem("authToken");
      socket.emit("get-game-data", { token });

      socket.on("user-in-waiting-room", ({ game, user }) => {
        console.log("Game data received:", game);
        handelSetGame(game);
        setCurrentUserId(user);
      });

      socket.on("user-not-in-room", () => {
        console.log("User is not in a game");
        navigate("/selectgame");
      });

      socket.on("invalidToken", () => {
        console.log("Invalid token");
      });

      socket.on("playerJoined", (roomData) => {
        handelSetGame(roomData.roomData);
      });

      socket.on('startGameSuccess',(game:ActiveGame)=>{
        console.log('Game started:', game);
        navigate('/playgame')
      })

      socket.on('startGameError',(message:string)=>{
        console.log('Game start error:', message);
      })
    }
  }, [socket]);

  const leaveRoom = () => {
    if (socket && game) {
      const token = localStorage.getItem("authToken");
      socket.emit("leaveRoom", { token, roomCode: game.roomCode });

      socket.on("leaveRoomSuccess", () => {
        console.log("Player successfully left the room.");
        navigate("/selectgame");
      });

      socket.on("leaveRoomError", (error: { message: unknown }) => {
        console.log(error.message);
      });
    }
  };


  return (
    <div className="w-full min-h-screen font-Quicksand flex flex-col bg-[#E9E8E4]">
      <Navbar />
      <div className="w-full py-6 px-8 relative">
        {/* Toggle Chat Button */}
        <button
            className="fixed top-1/3 z-30 -right-5 w-16 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
            onClick={() => setShowChat(!showChat)}
          >
            <div className="px-2 bg-[#33fee38e] rounded-full">9+</div>
          </button>
          <button
            className="fixed top-1/2 z-30 -right-5 w-16 h-12 rounded-full bg-white flex items-center justify-start px-3 shadow-lg"
            onClick={() => setShowCall(!showCall)}
          >
            <Headset />
          </button>
        {/* Main Lobby Content */}
        <OnlineLobby game={game} />

        {showChat && <Chat closeChat={() => setShowChat(false)} />}

          {showCall && <Call closeCall={() => setShowCall(false)}  />}

        {/* Back Button with Leave Confirmation */}
        <BackButton onLeave={leaveRoom} />
      </div>
    </div>
  );
};

export default WaitingLobby;
