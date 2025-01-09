import React, { useEffect, useState } from "react";
import GetWord from "./GetWord";
import ReadWord from "./ReadWord";
import PlayerIcon from "../utils/PlayerIcon";
import PlayerCard from "../utils/PlayerCard";
import InGameButton from "../utils/InGameButton";
import CivilianWin from "./CivilianWin";
import MrWhiteWin from "./MrWhiteWin";
import UndercoverWin from "./UndercoverWin";

interface word {
  civilianWord: string;
  UndercoverWord: string;
}

interface GetWord {
  word: word
}
const Game:React.FC<GetWord> = ({word}) => {
  // const [cardSeletion, setCardSelection] = useState(false);
  const [getWord, setGetWord] = useState(true);
  const [readWord, setReadWord] = useState(false);
  const [eliminationStart, setEliminationStart] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showConfirmEliminate, setShowConfirmEliminate] = useState(false);
  const [playerToEliminate, setPlayerToEliminate] = useState<number | null>(
    null
  );
  const [winCondition, setWinCondition] = useState<string | null>(null);

 

  interface Users {
    id: string;
    name: string;
    letter: string;
    color: string;
  }

  interface Player {
    user: Users;
    role: string;
    eliminated: boolean;
    selectCard: boolean;
  }




  const [playerList, setPlayerList] = useState<Player[]>(() => {
    const savedPlayerList = sessionStorage.getItem("playerList");
    return savedPlayerList ? JSON.parse(savedPlayerList) : null;
  });

 

  useEffect(() => {
    sessionStorage.setItem("playerList", JSON.stringify(playerList));
    checkWinCondition();
  }, [playerList]);

  useEffect(() => {
    updateCurrentPlayerIndex();
  }, [playerList]);

  const updateCurrentPlayerIndex = () => {
    let newIndex = currentPlayerIndex;
    while (newIndex < playerList.length && playerList[newIndex].selectCard) {
      newIndex++;
    }
    setCurrentPlayerIndex(newIndex);
    if (newIndex >= playerList.length) {
      // setCardSelection(true);
    }
  };

  const handelGetWord = () => {
    setGetWord(false);
    setReadWord(true);
  };

  const handelReadWord = () => {
    setReadWord(false);
    setPlayerList((prevPlayerList) =>
      prevPlayerList.map((player, index) =>
        index === currentPlayerIndex ? { ...player, selectCard: true } : player
      )
    );
    setGetWord(true);
  };

  const showNextCard = () => {
    setGetWord(true);
    setReadWord(false);
    if (currentPlayerIndex < playerList.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      // setCardSelection(true);
    }
  };

  const handelSetEliminate = () => {
    setEliminationStart(!eliminationStart);
  };

  const handleEliminatePlayer = (index: number) => {
    setPlayerList((prevPlayerList) =>
      prevPlayerList.map((player, i) =>
        i === index ? { ...player, eliminated: true } : player
      )
    );
    setShowConfirmEliminate(false);
    setPlayerToEliminate(null);
    setShowEliminatedPlayer(true);
  };

  const confirmEliminatePlayer = (index: number) => {
    setPlayerToEliminate(index);
    setShowConfirmEliminate(true);
    handelSetEliminate();
  };

  const countRemainingPlayers = (role: string) => {
    return playerList.filter(
      (player) => player.role === role && !player.eliminated
    ).length;
  };

  const checkWinCondition = () => {
    const remainingCivilians = countRemainingPlayers("Civilian");
    const remainingUndercovers = countRemainingPlayers("Undercover");
    const remainingMrWhites = countRemainingPlayers("Mr White");

    if (remainingUndercovers === 0 && remainingMrWhites === 0) {
      setWinCondition("CivilianWin");
    } else if (
      remainingUndercovers <= remainingCivilians &&
      remainingMrWhites === 0
    ) {
      if (remainingCivilians === remainingUndercovers) {
        setWinCondition("UndercoverWin");
      }
    } else if (
      remainingMrWhites <= remainingCivilians &&
      remainingUndercovers === 0
    ) {
      if (remainingCivilians === remainingMrWhites) {
        setWinCondition("MrWhiteWin");
      }
    } else if (
      remainingCivilians === 0 &&
      remainingUndercovers > 0 &&
      remainingMrWhites > 0
    ) {
      setWinCondition("UndercoverWin");
    }
  };

  if (winCondition === "CivilianWin") {
    sessionStorage.removeItem("playerList");
    return <CivilianWin navigateTo={'/offline/lobby'} />;
  } else if (winCondition === "UndercoverWin") {
    sessionStorage.removeItem("playerList");
    return <UndercoverWin navigateTo={'/offline/lobby'} />;
  } else if (winCondition === "MrWhiteWin") {
    sessionStorage.removeItem("playerList");
    return <MrWhiteWin navigateTo={'/offline/lobby'} />;
  }

  return (
    <>
      <div className="w-full h-full -mt-3 relative">
        <h2 className="text-lg font-semibold">
          {playerList[currentPlayerIndex]?.user.name}
        </h2>
        <h4>Please pick a card</h4>

        {getWord &&
          currentPlayerIndex < playerList.length &&
          !playerList[currentPlayerIndex].selectCard && (
            <GetWord
              index={currentPlayerIndex}
              playerList={playerList}
              handelGetWord={handelGetWord}
            />
          )}

        {readWord &&
          currentPlayerIndex < playerList.length &&
          !playerList[currentPlayerIndex].selectCard && (
            <ReadWord
              index={currentPlayerIndex}
              playerList={playerList}
              handelReadWord={handelReadWord}
              word={word}
              showNextCard={showNextCard}
            />
          )}

        <div className="mt-4 w-full flex gap-10 items-center justify-center">
          <div className="w-64 py-4 px-8 bg-[#11111114] rounded-2xl">
            <h4 className="text-base font-normal">
              {countRemainingPlayers("Undercover")} Undercovers Remaining out of{" "}
              {
                playerList?.filter((player) => player.role === "Undercover")
                  .length
              }
            </h4>
          </div>
          <div className="w-64 py-4 px-8 bg-[#ffffff58] text-gray-600 rounded-2xl">
            <h4 className="text-base font-normal">
              {countRemainingPlayers("Mr White")} Mr White Remaining out of{" "}
              {
                playerList?.filter((player) => player.role === "Mr White")
                  .length
              }
            </h4>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="mt-4 h-96 w-[50rem] bg-[#f3f3f5] rounded-2xl shadow-md overflow-y-auto py-6 px-8">
            <div className="w-full h-full grid grid-cols-5 gap-6">
              {playerList.map((player: Player, index: number) =>
                player.eliminated ? (
                  <div
                    key={index}
                    className="w-28 h-36 flex flex-col items-center justify-center bg-gray-800 rounded-lg"
                  >
                    <span className="text-white text-xl">X</span>
                    <span className="text-white text-sm">{player.role}</span>
                  </div>
                ) : player.selectCard ? (
                  <PlayerIcon
                    key={index}
                    player={player}
                    index={index}
                    eliminationStart={eliminationStart}
                    onClick={() => {
                      if (eliminationStart) confirmEliminatePlayer(index);
                    }}
                  />
                ) : (
                  <PlayerCard key={index} handelReadWord={handelReadWord} />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="px-8 py-2 mt-6 rounded-full text-lg font-semibold text-white bg-[#e4732d]"
          onClick={(e) => {
            e.preventDefault();
            handelSetEliminate();
          }}
        >
          Go to Vote
        </button>
      </div>

      <InGameButton />

      {showConfirmEliminate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Confirm Elimination</h2>
            <p>Are you sure you want to eliminate this player?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                onClick={() => setShowConfirmEliminate(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => handleEliminatePlayer(playerToEliminate!)}
              >
                Eliminate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
