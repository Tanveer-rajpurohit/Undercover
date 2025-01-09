import React from "react";
import { TbUserQuestion } from "react-icons/tb";

interface PlayerCardProps {
  handelReadWord: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({handelReadWord}) => {
  return (
    <>
      <div
        className="w-28 h-36 bg-[#dace24] rounded-lg flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          handelReadWord();
        }}
      >
        <TbUserQuestion className="w-12 h-12" />
      </div>
    </>
  );
};
export default PlayerCard;
