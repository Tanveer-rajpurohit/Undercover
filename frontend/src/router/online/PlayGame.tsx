import { useContext, useEffect, useState } from "react";
import PlayGameOnline from "../../components/game/online/play/PlayGameOnline";
import Navbar from "../../components/navbar/Navbar";
import PlayGroundContext from "../../context/PlayGround";
import SocketContext from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/game/online/Chat";
import { Headset } from "lucide-react";
import Call from "../../components/game/online/Call";

const PlayGame = () => {
  const [showChat, setShowChat] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const navigate = useNavigate();
  const { handelSetGame, setCurrentUserId } = useContext(PlayGroundContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      const token = localStorage.getItem("authToken");
      socket.emit("get-game-data", { token });

      socket.on("user-in-ongoing-room", ({ game, user }) => {
        handelSetGame(game);
        setCurrentUserId(user);
      });

      socket.on("user-in-waiting-room", ({ game, user }) => {
        console.log("Game data received:", game);
        navigate("/waitinglobby");
      });

      socket.on("user-not-in-room", () => {
        console.log("User is not in a game");
        navigate("/selectgame");
      });

      socket.on("invalidToken", () => {
        console.log("Invalid token");
      });
    }
  }, [socket]);

  return (
    <>
      <div className="w-full min-h-screen font-Quicksand flex flex-col bg-[#E9E8E4]">
        <Navbar />
        <div className="text-center w-full py-6 px-8 relative">
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

          <PlayGameOnline />

          {showChat && <Chat closeChat={() => setShowChat(false)} />}

          {showCall && <Call closeCall={() => setShowCall(false)}  />}
        </div>
      </div>
    </>
  );
};
export default PlayGame;
