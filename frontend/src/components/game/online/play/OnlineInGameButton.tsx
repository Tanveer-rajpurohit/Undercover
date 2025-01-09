import { EyeClosed, Hourglass, Undo, UserRound } from "lucide-react";

import { IoSettingsSharp } from "react-icons/io5";

interface buttonProps {
  handelReadWord: () => void;
}

const OnlineInGameButton: React.FC<buttonProps> = ({ handelReadWord }) => {




  const handlePlayAgain = () => {
    window.location.reload();
  };

  const memeber = () => {};
  return (
    <>
      <div className="fixed right-8 bottom-0 h-full w-20 flex flex-col justify-end items-end py-10 gap-2">
        {/* <div
          onClick={(e)=>{
            e.preventDefault();
            toggleMicrophone(micStatus === "on"? "off" : "on");
          }}
          className="p-2 rounded-full bg-[#9554f1] flex items-center justify-center"
        >
          <div className="play-1 w-full h-full flex items-center justify-center">
            <Mic className="text-white w-6 h-6 cursor-pointer" />
          </div>
        </div> */}

        <div
          onClick={handlePlayAgain}
          className="p-2 rounded-full bg-[#9554f1] flex items-center justify-center"
        >
          <div className="play-1 w-full h-full flex items-center justify-center">
            <Undo className="text-white w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div
          onClick={memeber}
          className="p-2 rounded-full bg-[#d9f154] flex items-center justify-center"
        >
          <div className="play-1 w-full h-full flex items-center justify-center">
            <UserRound className="text-white w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            handelReadWord();
          }}
          className="p-2 rounded-full bg-[#546ef1] flex items-center justify-center"
        >
          <div className="play-1 w-full h-full flex items-center justify-center">
            <EyeClosed className="text-white w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div className="p-2 rounded-full bg-[#54f176] flex items-center justify-center">
          <div className="play-1 w-full h-full flex items-center justify-center">
            <Hourglass className="text-white w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div className="p-2 rounded-full bg-[#F1548E] flex items-center justify-center">
          <div className="play-1 w-full h-full flex items-center justify-center">
            <IoSettingsSharp className="fill-white w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};
export default OnlineInGameButton;
