import React from "react";

interface User {
  letter: string;
  name: string;
  color: string;
}

interface Player {
  user: User;
  role: string;
  eliminated: boolean;
  selectCard: boolean;
}

interface PlayerIconProps {
  player: Player;
  index: number;
  eliminationStart: boolean;
  onClick: () => void;
}

const PlayerIcon: React.FC<PlayerIconProps> = ({
  index,
  player,
  eliminationStart,
  onClick,
}) => {
  return (
    <div className="text-center w-28 h-36 flex flex-col items-center justify-center">
      <div
        className="w-20 h-20 relative rounded-full flex items-center justify-center mb-1"
        style={{ backgroundColor: player.user.color }}
        onClick={onClick}
      >
        <span className="text-white text-xl">{player.user.letter}</span>
        {eliminationStart ? (
          <div className="absolute -top-3 right-[2px]">
            <button className="text-white bg-[#e4732d] rounded-full border border-white px-2 text-sm py-0">
              Eliminate
            </button>
          </div>
        ) : (
          <div
            className="w-8 h-8 absolute -top-1 -right-3 rounded-full border-2 flex items-center justify-center"
            style={{ backgroundColor: player.user.color }}
          >
            {index}
          </div>
        )}
      </div>
      <div className="mt-1 px-4 rounded-full bg-[#0909090e] backdrop-blur-3xl text-white">
        <span className="text-xs text-black font-semibold">{player.user.name}</span>
      </div>
    </div>
  );
};

export default PlayerIcon;