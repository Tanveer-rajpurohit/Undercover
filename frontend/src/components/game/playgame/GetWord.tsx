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

interface GetWordProps {
  playerList: Player[];
  index: number;
  handelGetWord: () => void;
}

const GetWord: React.FC<GetWordProps> = ({ playerList, index, handelGetWord }) => {
  return (
    <div className="absolute w-[20rem] h-[27rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border-[3px] border-white bg-[#E9E8E4] rounded-2xl py-8 px-10 flex flex-col items-center justify-between">
      <div>
        <h2 className="text-lg font-bold" style={{ color: playerList[index].user.color }}>
          {playerList[index].user.name}
        </h2>
        <h4 className="text-lg font-semibold">Please pick a card</h4>
      </div>
      <div>
        <div
          className="w-24 h-24 rounded-full border-[3px] border-white flex items-center justify-center mb-1"
          style={{ backgroundColor: playerList[index].user.color }}
        >
          <span className="text-white text-2xl font-semibold">
            {playerList[index].user.letter}
          </span>
        </div>
      </div>
      <div>
        <button
          className="font-bold text-white text-lg px-10 py-0.5 rounded-2xl"
          style={{ backgroundColor: playerList[index].user.color }}
          onClick={(e) => {
            e.preventDefault();
            handelGetWord();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GetWord;