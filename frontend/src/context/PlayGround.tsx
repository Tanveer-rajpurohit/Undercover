import { createContext, ReactNode, useState } from "react";

interface Chat {
  id: number;
  gameId: number;
  userId: number;
  message: string;
  createdAt: string;
  User:{
    id: number;
    name: string;
    email: string;
    profilePicture: string; 
  }
}
interface ActiveGame {
  id: number;
  hostId: number;
  players: string;
  status: string;
  roomCode: string;
  roles: null | string;
  createdAt: string;
  WordType: string;
  ChatMessage : Chat[]
}

const PlayGroundContext = createContext<{ game: ActiveGame | null, handelSetGame: (data: ActiveGame | null) => void, currentUserId:number, setCurrentUserId : (currentUserId: number)=>void }>({
  game: null,
  handelSetGame: () => {} ,
  currentUserId:0,
  setCurrentUserId:()=>{}  
});


export const PlaygroundProvider = ({ children }: { children: ReactNode }) => {

  const [game,setGame] = useState<ActiveGame | null>(null)

  const handelSetGame = (data: ActiveGame | null) =>{
      setGame(data)
  }

  const [currentUserId, setCurrentUserId] = useState(0)


     
  return (
    <PlayGroundContext.Provider value={{game,handelSetGame,currentUserId,setCurrentUserId}}>
      {children}
    </PlayGroundContext.Provider>
  );
};

export default PlayGroundContext;