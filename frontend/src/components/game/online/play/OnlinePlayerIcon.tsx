interface Player {
  userId: number;
  status: string;
  role: string;
  micStatus: string;
  name: string;
}

interface PlayerIconProps {
  player: Player;
  index: number;
  eliminationStart: boolean;
  onClick: (player: Player) => void;
}

const OnlinePlayerIcon: React.FC<PlayerIconProps> = ({
  index,
  player,
  eliminationStart,
  onClick,
}) => {
  return (
    <>
      <div className="text-center w-28 h-36 flex flex-col items-center justify-center">
        <div
          className="w-20 h-20 relative rounded-full flex items-center justify-center mb-1 border-2 border-[#111]"
          onClick={(e)=>{
            e.preventDefault();
            onClick(player)
          }}
        >
            <img src={""} alt="p" className="w-full h-full object-cover"/>
        {eliminationStart ? (
          <div className="absolute -top-3 right-[2px]">
            <button className="text-white bg-[#e4732d] rounded-full border border-white px-2 text-sm py-0">
              Eliminate
            </button>
          </div>
        ) : (
          <div
            className="w-8 h-8 absolute -top-1 -right-3 rounded-full border-2 flex items-center justify-center"
          >
            {index}
          </div>
        )}
      </div>
      <div className="mt-1 px-4 rounded-full bg-[#0909090e] backdrop-blur-3xl text-white">
        <span className="text-xs text-black font-semibold">{player.name}</span>
      </div>
    </div>
    </>
  );
};
export default OnlinePlayerIcon;
