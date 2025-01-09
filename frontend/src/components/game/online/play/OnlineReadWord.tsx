import React from "react";

interface readWordProps {
  currentPlayer: {
    name: string;
    email: string;
    profilePicture: string;
  };
  word: string;
  handelReadWord: () => void;
}

const OnlineReadWord: React.FC<readWordProps> = ({
  currentPlayer,
  word,
  handelReadWord,
}) => {
  return (
    <div className="absolute w-[20rem] h-[27rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border-[3px] border-white bg-[#E9E8E4] rounded-2xl py-8 px-10 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-between">
        <div className="w-24 h-24 rounded-full border-[3px] border-white flex items-center justify-center mb-1">
          <img src={currentPlayer.profilePicture} alt="p"
          className="w-full h-full object-cover" />
        </div>
        <h2 className="text-lg font-bold">{currentPlayer.name}</h2>
        <h4 className="text-base text-gray-600 font-semibold">
          Your secret word is
        </h4>
      </div>
      <div className="w-[90%] h-32 bg-[#ffffff68] rounded-2xl text-black flex items-center justify-center">
        <h2 className="text-2xl font-extrabold">{word}</h2>
      </div>

      <div>
        <button
          className="font-bold text-white text-lg px-10 py-0.5 rounded-2xl bg-[#0cf191]"
          
          onClick={(e) => {
            e.preventDefault();
            handelReadWord();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default OnlineReadWord;
