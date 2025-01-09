/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import "./CustomizeGame.css";
import LobbyPlaySelect from "./LobbyPlaySelect";
import { IoSettingsSharp } from "react-icons/io5";
import SelectGroup from "./SelectGroup";

interface Users {
  id: string;
  name: string;
  letter: string;
  color: string;
}

interface Playerr {
  user: Users;
  role: string;
  eliminated: boolean;
  selectCard: boolean;
}

const CustomizeGame = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    handelIsGroupSet()
  };

  const playerData: Playerr[] = JSON.parse(
    sessionStorage.getItem("playerList") || "[]"
  );

   const [isGrupeSet, setIsGrupeSet] = useState(() => {
      if(playerData.length <= 0 ){
        return false;
      }
      if(playerData.length > 0){
        return true;
      }
      else{
        return false;
      }
     }
    );
  
    const handelIsGroupSet = () => {
      setIsGrupeSet(() => {
        if(playerData.length <= 0 ){
          return false;
        }
        if(playerData.length > 0){
          return true;
        }
        else{
          return false;
        }
       });
    };
  

    useEffect(() => {
      handelIsGroupSet()
    },[playerData])

  

  return (
    <>
      <div className="w-full h-full py-6 px-8">
        <div className="w-full h-100px flex items-center justify-end">
          <div className="flex flex-col items-center justify-center">
            <button
              className="p-2 bg-[#30a9f5] rounded-full flex items-center justify-center"
              onClick={handleOpenModal}
            >
              <Users className="text-white" />
            </button>
            <h4 className="text-[#30a9f5] font-semibold">Groups</h4>
          </div>
        </div>

        <div className="w-full text-center">
          <LobbyPlaySelect isGrupeSet={isGrupeSet} />
        </div>

        <div className="w-full flex items-center justify-end">
          <div className="p-2 rounded-full bg-[#F1548E] flex items-center justify-center">
            <div className="play-1 w-full h-full flex items-center justify-center">
              <IoSettingsSharp className="fill-white w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <SelectGroup handleOpenModal={handleOpenModal}  />
        </div>
      )}
    </>
  );
};

export default CustomizeGame;