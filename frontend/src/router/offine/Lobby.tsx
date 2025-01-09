import CustomizeGame from "../../components/game/Lobby/CustomizeGame";
import Navbar from "../../components/navbar/Navbar";

const Lobby = () => {
  return (
    <>
      <div className="w-full h-screen font-Quicksand flex flex-col bg-[#E9E8E4]">
        <Navbar />

        <CustomizeGame />
      </div>
    </>
  );
};
export default Lobby;
