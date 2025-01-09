import CreateGroup from "../../components/game/Lobby/CreateGroup";
import Navbar from "../../components/navbar/Navbar";

const CreateGroupe = () => {
  return (
    <>
      <div className="w-full h-screen font-Quicksand flex flex-col bg-[#E9E8E4] ">
      <Navbar />
        <div className="text-center w-full py-6 px-8">
            <CreateGroup />
        </div>
      </div>
    </>
  );
};
export default CreateGroupe;
