interface Player {
  userId: number;
  status: string;
  role: string;
  micStatus: string;
  name: string;
}

interface JoinedPlayerCardProps {
  player: Player;
  isHost: boolean;
}

const JoinedPlayerCard: React.FC<JoinedPlayerCardProps> = ({ player, isHost }) => {
  return (
    <div className="w-full py-1.5 px-3 border-b-2 border-gray-200">
      <div className="flex items-center gap-10">
        <img
          className="w-8 h-8 rounded-full"
          src="https://example.com/user-image.jpg"
          alt="User Image"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-700">
            {player.name} {isHost && <span className="text-sm text-green-600">(Host)</span>}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JoinedPlayerCard;
