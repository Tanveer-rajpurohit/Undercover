import React from "react";
import { Link } from "react-router-dom";

interface Props {
  handleOpenModal: () => void;
}

const SelectGroup: React.FC<Props> = ({ handleOpenModal }) => {

  const handelSelectGroup = () => {
    sessionStorage.setItem('playerList', JSON.stringify(players));
    handleOpenModal()
  }

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

  // Get the player data from localStorage
  const playerData = JSON.parse(localStorage.getItem("playerList") || "{}");

  // Check if playerData is loaded and has players
  const { title, players, color } = playerData || { title: "", players: [], color: "" };

  return (
    <div className="h-[96%] rounded-3xl bg-gradient-to-b from-green-200 via-blue-200 to-yellow-200 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Groups</h1>
          <Link to={"/offline/lobby/creategroupe"}>
            <button className="text-3xl">+</button>
          </Link>
        </div>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mt-1 mb-6">
          Create and edit groups of players to save time next time you play.
        </p>

        {/* Card */}
        {players && players.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className="bg-[#4cd9a1] p-4 flex justify-between items-center">
              <h2 className="text-white text-lg">{title}</h2>
              <Link to={"/offline/lobby/creategroupe"}>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              </Link>
            </div>

            {/* Card Content */}
            <div className="p-4">
              {/* Player Circles */}
              <div className="flex justify-between mb-4">
                {players.map((player: Playerr, index: number) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
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

              {/* Bottom Actions */}
              <div className="flex justify-between items-center">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handelSelectGroup();
                  }} 
                  className="px-6 py-2 rounded-full border border-[#4cd9a1] text-[#4cd9a1] text-sm">
                  Select group
                </button>
                <button className="text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenModal();
            }}
            className="w-12 h-12 bg-[#007AFF] rounded-full flex items-center justify-center text-white shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectGroup;
