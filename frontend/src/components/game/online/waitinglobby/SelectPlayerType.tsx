import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../../../../context/SocketContext";
import PlayGroundContext from "../../../../context/PlayGround";

interface ActiveGame {
  id: number;
  hostId: number;
  players: string;
  status: string;
  roomCode: string;
  roles: null | string;
  createdAt: string;
  WordType: string;
}

interface OnlineLobbyProps {
  game: ActiveGame | null;
}

const SelectPlayerType: React.FC<OnlineLobbyProps> = ({ game }) => {
  const [civilians, setCivilians] = useState(3);
  const [undercovers, setUndercovers] = useState(1);
  const [mrWhite, setMrWhite] = useState(1);
  const [wordType, setWordType] = useState("Basic");

  const { socket } = useContext(SocketContext);
  const { currentUserId } = useContext(PlayGroundContext);

  const roomCode = game?.roomCode;
  const isHost = game?.hostId === currentUserId;

  

  useEffect(() => {
    if (game) {
      const parsedPlayers = JSON.parse(game.players);
      setCivilians(parsedPlayers.length - 2);
      setUndercovers(1);
      setMrWhite(1);
    }
  }, [game]);

  const handleIncrement = (role: string) => {
    if (role === "undercovers" && civilians !== undercovers + 1) {
      setUndercovers(undercovers + 1);
      setCivilians(civilians - 1);
    }
    if (role === "mrWhite" && civilians !== undercovers) {
      setMrWhite(mrWhite + 1);
      setCivilians(civilians - 1);
    }
  };

  const handleDecrement = (role: string) => {
    if (role === "undercovers" && undercovers > 0) {
      setUndercovers(undercovers - 1);
      setCivilians(civilians + 1);
    }
    if (role === "mrWhite" && mrWhite > 0) {
      setMrWhite(mrWhite - 1);
      setCivilians(civilians + 1);
    }
  };

  const handleWordTypeChange = (direction: string) => {
    const wordTypes = ["Basic", "Standard", "Advanced"];
    const currentIndex = wordTypes.indexOf(wordType);
    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + wordTypes.length) % wordTypes.length
        : (currentIndex + 1) % wordTypes.length;
    setWordType(wordTypes[newIndex]);
  };

  const handelStartGame = () => {
    if (roomCode) {
      socket.emit("startGame", {
        roomCode,
        civilians,
        undercovers,
        mrWhite,
      });
    }
  };

  const totalPlayers = game ? JSON.parse(game.players).length : 0;

  return (
    <>
      <div className="w-full mt-4 text-center">
        <h1 className="text-3xl text-[#111111] font-bold">
          Players: {totalPlayers}
        </h1>
        <input
          type="range"
          value={totalPlayers}
          min={4}
          max={20}
          className="w-48 mt-4 range-input"
          disabled
        />
      </div>

      <div className="w-[16rem] mt-3 mx-auto rounded-2xl py-6 bg-[#FCFEFD] flex flex-col items-center justify-center gap-4 shadow-lg">
        <div className="flex gap-3 items-center justify-center text-white">
          <button
            className="bg-[#111111] rounded-full shadow-md w-5 h-5 flex items-center justify-center"
            onClick={() => handleDecrement("undercovers")}
            disabled={!isHost || undercovers <= 0}
          >
            -
          </button>
          <button className="bg-[#30a9f5] px-4 py-0.5 rounded-full shadow-md">
            {undercovers} Undercovers
          </button>
          <button
            className="bg-[#111111] rounded-full shadow-md w-5 h-5 flex items-center justify-center"
            onClick={() => handleIncrement("undercovers")}
            disabled={!isHost || civilians === undercovers + 1}
          >
            +
          </button>
        </div>
        <div className="flex gap-3 items-center justify-center text-black">
          <button
            className="bg-[#ffffff] rounded-full shadow-md w-5 h-5 flex items-center justify-center"
            onClick={() => handleDecrement("mrWhite")}
            disabled={!isHost || mrWhite <= 0}
          >
            -
          </button>
          <button className="bg-[#ffffff] px-4 py-0.5 rounded-full shadow-md">
            {mrWhite} Mr. White
          </button>
          <button
            className="bg-[#ffffff] rounded-full shadow-md w-5 h-5 flex items-center justify-center"
            onClick={() => handleIncrement("mrWhite")}
            disabled={!isHost || civilians === undercovers}
          >
            +
          </button>
        </div>
        <div className="flex gap-3 items-start justify-center text-white">
          <button className="bg-[#30a9f5] px-4 py-0.5 rounded-full shadow-md">
            {civilians} Civilians
          </button>
        </div>
      </div>

      <div className="w-[14rem] mt-3 mx-auto rounded-2xl py-4 bg-[#FCFEFD] flex flex-col items-center justify-center gap-4 shadow-lg">
        <h4 className="text-gray-500 text-sm">Words</h4>
        <div className="flex gap-3 -mt-4 items-center justify-center text-white">
          <button
            className="bg-[#111111] rounded-full shadow-md"
            onClick={() => handleWordTypeChange("left")}
          >
            <ChevronLeft />
          </button>
          <button className="text-[#111111] px-4 py-0.5 rounded-full shadow-md">
            {wordType}
          </button>
          <button
            className="bg-[#111111] rounded-full shadow-md"
            onClick={() => handleWordTypeChange("right")}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="text-center mt-9">
        <button
          onClick={(e) => {
            e.preventDefault();
            handelStartGame();
          }}
          disabled={totalPlayers < 3 || !isHost}
          className={`px-8 py-1.5 rounded-full text-lg font-semibold text-white ${
            totalPlayers < 3 || !isHost ? "bg-gray-400" : "bg-[#38DE7D]"
          }`}
        >
          Start
        </button>
      </div>
    </>
  );
};

export default SelectPlayerType;
