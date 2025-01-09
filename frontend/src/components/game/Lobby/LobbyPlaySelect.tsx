import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

interface props{
  isGrupeSet: boolean;
}
const LobbyPlaySelect:React.FC<props> = ({isGrupeSet}) => {
  const [players, setPlayers] = useState(5);
  const rangeRef = useRef<HTMLInputElement>(null);

  const [civilians, setCivilians] = useState(3);
  const [undercovers, setUndercovers] = useState(1);
  const [mrWhite, setMrWhite] = useState(1);
  const [wordType, setWordType] = useState("Basic");

  const wordTypes = ["Basic", "Standard", "Advanced"];

  const navigate = useNavigate();

  const playerData: Playerr[] = JSON.parse(
    sessionStorage.getItem("playerList") || "[]"
  );

 
  useEffect(() => {
    if (rangeRef.current) {
      rangeRef.current.style.setProperty(
        "--value",
        `${((players - 4) / 16) * 100}%`
      );
    }
  }, [players]);

  useEffect(() => {
    sessionStorage.removeItem("playerList");
  }, []);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPlayers(value);
    event.target.style.setProperty("--value", `${((value - 4) / 16) * 100}%`);

    // Adjust roles based on the new number of players
    const minUndercoverMrWhite = value > 10 ? 2 : 1;
    const totalRoles = civilians + undercovers + mrWhite;

    if (totalRoles < value) {
      setCivilians(civilians + (value - totalRoles));
    } else if (totalRoles > value) {
      const excess = totalRoles - value;
      if (civilians > excess) {
        setCivilians(civilians - excess);
      } else {
        setCivilians(0);
        const remainingExcess = excess - civilians;
        if (undercovers > remainingExcess) {
          setUndercovers(undercovers - remainingExcess);
        } else {
          setUndercovers(0);
          setMrWhite(mrWhite - (remainingExcess - undercovers));
        }
      }
    }

    setUndercovers(Math.max(minUndercoverMrWhite, undercovers));
    setMrWhite(Math.max(minUndercoverMrWhite, mrWhite));
  };

  const handleIncrement = (role: string) => {
    if (role === "civilians" && civilians + undercovers + mrWhite < players) {
      setCivilians(civilians + 1);
    }
    if (role === "undercovers" && civilians + undercovers + mrWhite < players) {
      setUndercovers(undercovers + 1);
    }
    if (role === "mrWhite" && civilians + undercovers + mrWhite < players) {
      setMrWhite(mrWhite + 1);
    }
  };

  const handleDecrement = (role: string) => {
    if (role === "civilians" && civilians > 0) {
      setCivilians(civilians - 1);
    }
    if (role === "undercovers" && undercovers > 0) {
      setUndercovers(undercovers - 1);
      setCivilians(civilians + 1);
    }
    if (role === "mrWhite" && mrWhite > 0) {
      setMrWhite(mrWhite - 1);
      if (undercovers + mrWhite < players) {
        setUndercovers(undercovers + 1);
      } else {
        setCivilians(civilians + 1);
      }
    }
  };

  const handleWordTypeChange = (direction: string) => {
    const currentIndex = wordTypes.indexOf(wordType);
    if (direction === "left") {
      const newIndex = (currentIndex - 1 + wordTypes.length) % wordTypes.length;
      setWordType(wordTypes[newIndex]);
    } else if (direction === "right") {
      const newIndex = (currentIndex + 1) % wordTypes.length;
      setWordType(wordTypes[newIndex]);
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#4cd9a1",
      "#4CD964",
      "#4c9cd9",
      "#d94c4c",
      "#ff6600",
      "#ff3366",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handelStartGame = () => {
    if (playerData.length <= 0) {
      // Create an array with the correct number of roles
      const roles = [
        ...Array(civilians).fill("Civilian"),
        ...Array(undercovers).fill("Undercover"),
        ...Array(mrWhite).fill("Mr White"),
      ];

      // Shuffle the roles array randomly
      for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]]; // Swap elements
      }

      // Assign roles to players
      for (let i = 1; i <= players; i++) {
        playerData.push({
          user: {
            id: `${i}`,
            letter: `P${i}`,
            name: `Player${i}`,
            color: getRandomColor(),
          },
          role: roles[i - 1],
          eliminated: false,
          selectCard: false,
        });
      }

      // Store the player data in sessionStorage
      sessionStorage.setItem("playerList", JSON.stringify(playerData));

      navigate("/offline/playground");
    }

    if (playerData.length > 0) {
      console.log(playerData);

      const roles = [
        ...Array(civilians).fill("Civilian"),
        ...Array(undercovers).fill("Undercover"),
        ...Array(mrWhite).fill("Mr White"),
      ];

      // Shuffle the roles array randomly
      for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]]; // Swap elements
      }

      for (let i = 0; i < players; i++) {
        if (playerData[i]) {
          playerData[i].role = roles[i];
        }
      }

      sessionStorage.setItem("playerList", JSON.stringify(playerData));

      navigate("/offline/playground");
    }
  };

  return (
    <>
      {!isGrupeSet ? (
        <div className="w-full mt-4 text-center">
          <div>
            <h1 className="text-3xl text-[#111111] font-bold">
              Players: {players}
            </h1>
          </div>

          <input
            type="range"
            ref={rangeRef}
            value={players}
            min={4}
            max={20}
            className="w-48 mt-4 range-input"
            onChange={handleRangeChange}
          />
        </div>
      ) : (
        <div className="w-full -mt-6 text-center flex items-center justify-center">
          <div className="w-80 flex flex-col justify-between mb-4 bg-white rounded-2xl">
            <div className=" bg-[#00D8E3] w-full h-[45px] flex flex-col items-center justify-center rounded-t-2xl">
              <h2 className="text-lg font-semibold text-white ">
                New Groupe 1
              </h2>
              <h4 className="text-xs text-white ">4 Players</h4>
            </div>
            <div className="bg-[#ffffff] w-full h-[90px] grid grid-cols-4 px-10  items-center justify-center rounded-b-2xl gap-2 overflow-y-auto py-1">
              {playerData?.map((player: Playerr, index: number) => (
                <div key={index} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-1 "
                    style={{ backgroundColor: player?.user.color }}
                  >
                    <span className="text-white text-xl">
                      {player?.user.letter}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">
                    {player?.user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-[16rem] mt-3 mx-auto rounded-2xl py-6 bg-[#FCFEFD] flex flex-col items-center justify-center gap-4 shadow-lg">
        <div className="flex gap-3 items-start justify-center text-white">
          <button className="bg-[#30a9f5] px-4 py-0.5 rounded-full shadow-md">
            {civilians}. Civilians
          </button>
        </div>
        <div className="flex gap-3 items-center justify-center text-white">
          <button
            className="bg-[#111111] rounded-full shadow-md"
            onClick={() => handleDecrement("undercovers")}
          >
            <Minus />
          </button>
          <button className="bg-[#111111] px-4 py-0.5 rounded-full shadow-md">
            {undercovers}. Undercovers
          </button>
          <button
            className="bg-[#111111] rounded-full shadow-md"
            onClick={() => handleIncrement("undercovers")}
          >
            <Plus />
          </button>
        </div>
        <div className="flex gap-3 items-center justify-center text-black">
          <button
            className="bg-[#ffffff] rounded-full shadow-md"
            onClick={() => handleDecrement("mrWhite")}
          >
            <Minus />
          </button>
          <button className="bg-[#ffffff] px-4 py-0.5 rounded-full shadow-md">
            {mrWhite}. Mr. White
          </button>
          <button
            className="bg-[#ffffff] rounded-full shadow-md"
            onClick={() => handleIncrement("mrWhite")}
          >
            <Plus />
          </button>
        </div>
      </div>

      <div className="w-[14rem] mt-3 mx-auto rounded-2xl py-4 bg-[#FCFEFD] flex flex-col items-center justify-center gap-4 shadow-lg">
        <h4 className="text-gray-500 text-sm">Words</h4>
        <div className="flex gap-3 -mt-4 items-center justify-center text-white">
          <button
            className="bg-[#111111] rounded-full shadow-md"
            onClick={() => handleWordTypeChange("left")}
          >
            <ChevronLeft />
          </button>
          <button className="text-[#111111] px-4 py-0.5 rounded-full shadow-md">
            {wordType}
          </button>
          <button
            className="bg-[#111111] rounded-full shadow-md"
            onClick={() => handleWordTypeChange("right")}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="text-center mt-7">
        <button
          onClick={(e) => {
            e.preventDefault();
            handelStartGame();
          }}
          className="bg-[#38DE7D] px-8 py-0.5 rounded-full text-lg font-semibold text-white"
        >
          Start
        </button>
      </div>
    </>
  );
};

export default LobbyPlaySelect;
