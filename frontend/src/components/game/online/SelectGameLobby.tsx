import { useState } from "react";
import { Search } from "lucide-react";
import { GameCard } from "./GameCard";
import { JoinGameModal } from "./JoinGameModal";
import { CreateGameModal } from "./CreateGameModal";
import JoinUsingCode from "./JoinUsingCode";

interface Player {
  userId: number;
  status: string;
  role: string;
  micStatus: string;
  name: string;
}

interface ActiveGame {
  id: number;
  hostId: number;
  players: string; // JSON string of players
  status: string;
  roomCode: string;
  roles: null | string;
  createdAt: string;
  WordType: string;
}

interface SelectGameLobbyProps {
  activeGames: ActiveGame[];
}

export default function SelectGameLobby({ activeGames }: SelectGameLobbyProps) {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<ActiveGame | null>(null);
  const [joinRoomCode, setJoinedRoomCode] = useState(false);

  const handleJoinGame = (game: ActiveGame) => {
    setSelectedGame(game);
    setJoinModalOpen(true); // Open the join game modal
  };

  const handleJoinRoomCode = () => {
    setJoinedRoomCode(!joinRoomCode); // Toggle the join using code modal
  };

  const getHostName = (playersJson: string): string => {
    try {
      const players: Player[] = JSON.parse(playersJson);
      const host = players.find((player) => player.role === "host");
      return host?.name || "Unknown Host";
    } catch (error) {
      console.error("Failed to parse players JSON:", error);
      return "Unknown Host";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl">
            T
          </div>
          <h1 className="font-bold">Tanveer Sing.</h1>
        </div>
        <div className="flex gap-2">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <span className="text-pink-500">2 Win</span>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-sm flex items-center gap-1">
            <span className="text-yellow-500">👑</span>
            <span>1</span>
          </div>
        </div>
      </header>

      {/* Game List */}
      <main className="p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="text-xl text-blue-500 font-medium">Public games</h2>
            <button className="text-blue-500">
              <span className="rotate-90 inline-block">↑↓</span>
            </button>
          </div>

          <div className="p-4 grid gap-2">
            {activeGames.map((game) => (
              <GameCard
                key={game.id}
                host={getHostName(game.players)} // Get the host name from players JSON
                players={JSON.parse(game.players).length}
                status={game.status}
                countryFlag="/placeholder.svg?height=24&width=24"
                handleJoinGame={() => handleJoinGame(game)} // Handle join game click
              />
            ))}
          </div>
        </div>

        {/* Join with Code */}
        <div className="mt-4" onClick={handleJoinRoomCode}>
          <button className="w-full bg-white rounded-full p-4 flex items-center justify-center gap-2 text-blue-500 hover:bg-blue-50 transition-colors">
            <Search className="w-5 h-5" />
            Join a game with code
          </button>
        </div>

        {/* Create Game Button */}
        <div className="mt-4">
          <button
            className="w-full bg-pink-500 text-white rounded-full p-4 font-medium hover:bg-pink-600 transition-colors"
            onClick={() => setCreateModalOpen(true)}
          >
            Create new game
          </button>
        </div>
      </main>

      {/* Modals */}
      <JoinGameModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        gameDetails={{
          hostLevel: 2,
          standardWords: 80,
          premiumWords: 0,
          hostName: selectedGame ? getHostName(selectedGame.players) : "Ammaar",
          roomCode: selectedGame?.roomCode
        }}
      />

      <CreateGameModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <JoinUsingCode isOpen={joinRoomCode} onClose={handleJoinRoomCode} />
    </div>
  );
}
