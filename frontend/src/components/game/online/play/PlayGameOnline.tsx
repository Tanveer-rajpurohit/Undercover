import { useContext, useEffect, useState } from "react";
import OnlineReadWord from "./OnlineReadWord";
import OnlinePlayerIcon from "./OnlinePlayerIcon";
import OnlineInGameButton from "./OnlineInGameButton";
import PlayGroundContext from "../../../../context/PlayGround";
import SocketContext from "../../../../context/SocketContext";
import { useNavigate } from "react-router-dom";

interface Player {
  userId: number;
  status: string;
  role: string;
  micStatus: string;
  name: string;
}

interface Role {
  userId: number;
  micStatus: string;
  name: string;
  role: string;
  eliminated: boolean;
  word: string;
  voteCompleted: boolean;
  vote: number;
}



const PlayGameOnline = () => {
  const [readWord, setReadWord] = useState(true);
  const [eliminationStart, setEliminationStart] = useState(false);
  const [showConfirmEliminate, setShowConfirmEliminate] = useState(false);
  const [voteTO, setVoteTO] = useState<Player | null>(null);
  const [roles, setRoles] = useState<Role[] | null>([]);

  const { game, currentUserId } = useContext(PlayGroundContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleEliminatePlayer = () => {

    const To = voteTO?.userId;
    const roomCode = game?.roomCode;
    

    socket.emit("VoteIncrease", { To, roomCode, currentUserId });
    setShowConfirmEliminate(false)

    socket.once("VoteIncreaseError", (message: string) => {
      console.error("Error:", message);
    });
  };

  const handleSetEliminate = () => {
    setEliminationStart((prev) => !prev);
  };

  const handleReadWord = () => {
    setReadWord((prev) => !prev);
  };

  const confirmEliminatePlayer = (player: Player) => {
    setVoteTO(player);
    setShowConfirmEliminate(true);
  };

  useEffect(() => {
    if (game?.roles) {
      setRoles(JSON.parse(game.roles));
    }

    const handleVoteUpdate = (data: { roles: Role[] }) => {
      setRoles(data.roles);
    };

    if (socket) {
      socket.on("VoteUpdated", handleVoteUpdate);

      socket.on("PlayerEliminated", ({ roles }: { roles: Role[] }) => {
        setRoles(roles);
        alert("A player has been eliminated.");
      });

      socket.on("GameOver", ({ winCondition }: { winCondition: string }) => {
        console.log(winCondition);
        
        if (winCondition === "CivilianWin"){
          navigate('/cwin')
        }
        else if (winCondition === "UndercoverWin"){
          navigate('/uwin')

          
        }
        else if (winCondition === "MrWhiteWin"){
          navigate('/wwin')
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("VoteUpdated", handleVoteUpdate);
        socket.off("PlayerEliminated");
        socket.off("GameOver");
      }
    };
  }, [game, socket, navigate]);

  const players: Player[] = JSON.parse(game?.players || "[]");
  const currentPlayerRole = roles?.find((role) => role.userId === currentUserId);
  const currentWord = currentPlayerRole?.word || "No word assigned";

  return (
    <div className="w-full h-full -mt-3 relative z-10">
      <h2 className="text-lg font-semibold">{currentPlayerRole?.name}</h2>
      <h4>Please pick a card</h4>

      {readWord && (
        <OnlineReadWord
          handelReadWord={handleReadWord}
          word={currentWord}
          currentPlayer={{
            name: currentPlayerRole?.name || "Unknown",
            email: "",
            profilePicture: "",
          }}
        />
      )}

      <div className="mt-4 w-full flex gap-10 items-center justify-center">
        <div className="w-64 py-4 px-8 bg-[#11111114] rounded-2xl">
          <h4 className="text-base font-normal">
            1 Undercovers Remaining out of 2
          </h4>
        </div>
        <div className="w-64 py-4 px-8 bg-[#ffffff58] text-gray-600 rounded-2xl">
          <h4 className="text-base font-normal">
            1 Mr White Remaining out of 2
          </h4>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="mt-4 h-96 w-[50rem] bg-[#f3f3f5] rounded-2xl shadow-md overflow-y-auto py-6 px-8">
          <div className="w-full h-full grid grid-cols-5 gap-6">
            {players.map((player, index) => (
              roles && roles[index]?.eliminated ? (
                <div
                  key={index}
                  className="w-28 h-36 flex flex-col items-center justify-center bg-gray-800 rounded-lg"
                >
                  <span className="text-white text-xl">X</span>
                  <span className="text-white text-sm">{roles[index]?.role}</span>
                </div>
              ) : (
                <OnlinePlayerIcon
                  key={index}
                  player={player}
                  index={index}
                  eliminationStart={eliminationStart}
                  onClick={() => {
                    if (eliminationStart) confirmEliminatePlayer(player);
                  }}
                />
              )
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="px-8 py-2 mt-6 rounded-full text-lg font-semibold text-white bg-[#e4732d]"
          onClick={handleSetEliminate}
        >
          Go to Vote
        </button>
      </div>

      <OnlineInGameButton handelReadWord={handleReadWord} />

      {showConfirmEliminate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Confirm Elimination</h2>
            <p>Are you sure you want to eliminate this player?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                onClick={() => setShowConfirmEliminate(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleEliminatePlayer}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Eliminate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayGameOnline;
