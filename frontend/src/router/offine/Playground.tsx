import Game from "../../components/game/playgame/Game";
import Navbar from "../../components/navbar/Navbar";
import useWord from "../../hook/useWord";

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

interface word {
  civilianWord: string;
  UndercoverWord: string;
}

const Playground = () => {
  const playerData: Playerr[] = JSON.parse(
    sessionStorage.getItem("playerList") || "[]"
  );

  const { loading, gameword } = useWord(); 

  console.log(gameword);
    
  
  if (loading) {
      return <div>Loading...</div>;
  }

  


   const word: word = {
    civilianWord: gameword.pair1,
    UndercoverWord: gameword.pair2,
  };
   
  return (
    <>
      <div className="w-full min-h-screen font-Quicksand flex flex-col bg-[#E9E8E4]">
        <Navbar />

        <div className="text-center w-full py-6 px-8">
          <Game word={word}/>
        </div>
      </div>
    </>
  );
};
export default Playground;
