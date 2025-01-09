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

interface EliminateProps {
  role: string;
  index: number;
  playerList: Player[];
  handleShowEliminatedPlayer: () => void;
}

const Eliminate: React.FC<EliminateProps> = ({
  index,
  playerList,
  handleShowEliminatedPlayer,
  role,
}) => {
  return (
    <div className="absolute w-[17rem] h-[22rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-[#E9E8E4] rounded-2xl py-8 px-10 flex flex-col items-center justify-between">
      <div>
        <h2 className="text-xl font-extrabold">An {role} has been eliminated!</h2>
      </div>
      <div className="flex flex-col items-center justify-between">
        <div
          className="w-24 h-24 rounded-full border-[3px] border-white flex items-center justify-center mb-1"
          style={{ backgroundColor: playerList[index].user.color }}
        >
          <span className="text-white text-2xl font-semibold">
            {playerList[index].user.letter}
          </span>
        </div>
        <h2 className="text-lg font-bold">{playerList[index].user.name}</h2>
        <h3 className="text-md font-semibold">Role: {playerList[index].role}</h3>
      </div>
      <div>
        <button
          className="font-bold text-white text-lg px-10 py-0.5 rounded-2xl"
          style={{ backgroundColor: playerList[index].user.color }}
          onClick={(e) => {
            e.preventDefault();
            handleShowEliminatedPlayer();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Eliminate;