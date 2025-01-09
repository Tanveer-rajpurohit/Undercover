import { useState } from "react";
import { FaFlagUsa, FaFlag, FaTimes, FaWifi } from "react-icons/fa";
import "./Home.css";
import { Play, ScrollText } from "lucide-react";
import GameGuide from "./GameGuide";
import { Link } from "react-router-dom";
const Home = () => {
  const [language, setLanguage] = useState("English");
  const [role, setRole] = useState(false);
  const [showPlayOptions, setShowPlayOptions] = useState(false);


  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const getFlagIcon = () => {
    switch (language) {
      case "English":
        return <FaFlagUsa className="animate-bounce text-blue-500" />;
      case "Hindi":
        return <FaFlag className="animate-bounce text-orange-500" />;
      default:
        return <FaFlagUsa className="animate-bounce text-blue-500" />;
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between h-full">

      
        <div
          className={` ${
            role ? "w-[73%]" : " w-[100%]"
            } h-full relative  py-6 px-8`}
        >


          <div className="w-full h-100px flex items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <button
                className="w-12 h-12 rounded-2xl border border-black flex items-center justify-center"
                onClick={() => {
                  if (language === "English") {
                    handleLanguageChange("Hindi");
                  } else {
                    handleLanguageChange("English");
                  }
                }}
              >
                {getFlagIcon()}
              </button>
              <h4>{language}</h4>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="w-12 h-12 rounded-2xl border border-black flex items-center justify-center"
                onClick={() => {
                  setRole(!role);
                }}
              >
                <ScrollText className="animate-bounce text-[#675353]" />
              </button>
              <h4>role</h4>
            </div>
          </div>

          <div className="w-full mt-32 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-sm text-gray-800">Welcome to Undercover!</h1>
              <h2 className="uppercase text-6xl font-extrabold mt-2 title-3d">
                <span>UNDER</span>
                <br />
                <span>COVER</span>
              </h2>
            </div>
          </div>

          <div className="play-btn absolute bottom-20 right-24 w-20 h-32 border-2 border-black flex items-center justify-center">
            <div onClick={() => setShowPlayOptions(!showPlayOptions)} className="play-1 w-full h-full flex items-center justify-center">
              <Play
                className="fill-black w-12 h-12 cursor-pointer"
                
              />
            </div>
          </div>

          {showPlayOptions && (
            
            <div className="absolute bottom-32 right-52 flex flex-col items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
              <Link to={'/selectgame'}>
              <button className="flex flex-col items-center gap-2 text-white bg-[#3f8ee8] px-4 py-2 rounded-lg w-full">
                <FaWifi className="text-white" />
                <span className="text-lg font-bold">Play Online</span>
                <span className="text-sm w-72">Play online with your friends  or with strangers.</span>
              </button>
            </Link>
             <Link to={'/offline/lobby'}>
             <button className="flex flex-col items-center gap-2 text-white bg-[#29e7ee] px-4 py-2 rounded-lg w-full">
                <FaTimes className="text-white" />
                <span className="text-lg font-bold">Play Offline</span>
                <span className="text-sm w-72">Everyone plays on the same phone. Players must be physically together.</span>
              </button>
             </Link>
            </div>
          )}
        </div>
        {role && (
          <div className="w-[27%] h-full relative bg-[#2ae8d839] backdrop-blur-3xl ">
            <GameGuide />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
