import React, { useContext } from "react";
import { Copy } from "lucide-react";
import JoinedPlayerCard from "./JoinedPlayerCard";
import { ToggleButton } from "./ToggleButton";
import SelectPlayerType from "./SelectPlayerType";
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

interface Player {
  userId: number;
  status: string;
  role: string;
  micStatus: string;
  name: string;
}

interface OnlineLobbyProps {
  game: ActiveGame | null;
}

const OnlineLobby: React.FC<OnlineLobbyProps> = ({ game }) => {
  if (!game) return null;

  const players: Player[] = JSON.parse(game.players as string);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currentUserId } = useContext(PlayGroundContext); // Access the current user's ID
  const isHost = game.hostId === currentUserId; // Check if the current user is the host

  return (
    <div className="w-full h-full">
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <BackButton /> */}
        </div>
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-lg font-semibold">Public</h2>
          <ToggleButton />
        </div>
      </header>

      <div className="w-full flex items-start justify-center gap-36 relative">
        <main className="p-4">
          {isHost && <SelectPlayerType game={game} />} {/* Render only for host */}
        </main>

        <main className="p-4">
          <div className="bg-white rounded-2xl shadow-sm overflow-y-auto min-h-80 max-h-[28rem]">
            <div className="p-4 flex items-center justify-between border-b">
              <h2 className="text-xl text-blue-500 font-medium">Public games</h2>
              <button className="text-blue-500">
                <span className="rotate-90 inline-block">↑↓</span>
              </button>
            </div>

            <div className="p-4 grid gap-2">
              {players.map((player: Player) => (
                <JoinedPlayerCard
                  key={player.userId}
                  player={player}
                  isHost={player.userId === game.hostId}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <div className="px-2 py-1.5 bg-white shadow-sm rounded-2xl flex items-center justify-between gap-5">
              <div className="flex flex-col items-center justify-start">
                <h4 className="text-sm font-light text-blue-600">Room code</h4>
                <h2 className="font-lg font-semibold text-blue-600">
                  {game.roomCode}
                </h2>
              </div>
              <div className="">
                <Copy className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OnlineLobby;
