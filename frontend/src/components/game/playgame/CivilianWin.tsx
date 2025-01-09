import React from 'react';
import { useNavigate } from 'react-router-dom';

interface props{
  navigateTo: string; 
}

const CivilianWin: React.FC<props> = ({navigateTo}) => {

  const navigate = useNavigate();
  const handlePlayAgain = () => {
    sessionStorage.removeItem("playerList");
    navigate(navigateTo);

  };

  return (
    <div className="absolute w-[20rem] h-[27rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border-[3px] border-white bg-[#E9E8E4] rounded-2xl py-8 px-10 flex flex-col items-center justify-between">
      <div className="">
        <h2 className="text-xl font-extrabold">Civilians have won!</h2>
      </div>
      <div className="">
            <img src="https://images.squarespace-cdn.com/content/v1/6166cfc7f0f9c96fd146e6ca/1634503933306-I4KDTGU2VDXKD9GK2QR1/undercover+game+civilians+role" alt="" />
            
        </div>
      <div className="flex flex-col items-center justify-between">
        <button
          className="w-[10rem] h-[3rem] bg-[#578BFF] text-white font-semibold rounded-xl hover:bg-[#4968C8] transition duration-300"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default CivilianWin;