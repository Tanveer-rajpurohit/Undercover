import { useNavigate } from "react-router-dom";
import SelectGameLobby from "../../components/game/online/SelectGameLobby";
import Navbar from "../../components/navbar/Navbar";
import useActiveGameList from "../../hook/useActiveGameList";
import { useContext, useEffect } from "react";
import SocketContext from "../../context/SocketContext";
import PlayGroundContext from "../../context/PlayGround";

interface ActiveGame {
  id: number;
  hostId: number;
  players: string; 
  status: string;
  roomCode: string;
  roles: null | string;
  createdAt: string;
  WordType: string;

}
const SelectGame = () => {

  const navigate = useNavigate()

  const {socket} = useContext(SocketContext)
  const {handelSetGame} = useContext(PlayGroundContext)



  const token = localStorage.getItem('authToken');
  if(!token){
    navigate('/login')
  }
  useEffect(() => {
    if (socket) {
      socket.emit('check-game-status', { token });

      socket.on('user-in-waiting-room',(game)=>{
        navigate('/waitinglobby')
      }) 

      socket.on('user-in-ongoing-game',(game:ActiveGame)=>{
        console.log('User in ongoing game:', game);
        handelSetGame(game)
        navigate('/playgame')
      })

      socket.on('user-not-in-room',()=>{
        console.log('abcd');
        
      })
    } 

   
  },[socket])


  const {loading, activeGames} = useActiveGameList();
  console.log(activeGames);

  if(loading){
    return <div>Loading...</div>
  }
  
  return (
    <>
      <div className="w-full min-h-screen font-Quicksand flex flex-col bg-[#E9E8E4] ">
        <Navbar />
        <div className="w-full py-6 px-8 relative">
          <SelectGameLobby activeGames={activeGames} />
        </div>
      </div>
    </>
  );
};
export default SelectGame;
