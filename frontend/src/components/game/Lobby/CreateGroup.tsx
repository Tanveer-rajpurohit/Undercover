import { Edit3, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import AddPlayer from "./AddPlayer";
import { useNavigate } from "react-router-dom";

// Define the User and Player interfaces
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

const CreateGroup = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("New Group 2");
  const [color, setColor] = useState("#00D8E3");
  const [players, setPlayers] = useState<Playerr[]>([]); // Use Playerr[] for type safety
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);

  const navigate = useNavigate();

  // Check localStorage for existing group data when component mounts
  useEffect(() => {
    const savedGroupData = localStorage.getItem("playerList");
    if (savedGroupData) {
      const parsedData = JSON.parse(savedGroupData);
      setTitle(parsedData.title || "New Group 2");
      setColor(parsedData.color || "#00D8E3");
      setPlayers(parsedData.players || []);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleAddPlayer = (name: string) => 
    {
    const newPlayer: Playerr = {
      user: {
        id: players.length.toString(),  // Using the length of the players array as the ID
        name,
        letter: name.charAt(0).toUpperCase(),
        color: color,
      },
      role: "",
      eliminated: false,
      selectCard: false,
    };
    setPlayers([...players, newPlayer]);
  };
  

  const handleColorForPlayer = (index: number, newColor: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].user.color = newColor;
    setPlayers(updatedPlayers);
  };

  const handleStart = () => {
    const groupData = {
      title,
      players,
      color,
    };
    localStorage.setItem("playerList", JSON.stringify(groupData));

    navigate("/offline/lobby")
  };

  return (
    <div className="w-full text-center p-4">
      {/* Editable Heading Section */}
      <div className="flex items-center justify-center space-x-2">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
            className="text-xl font-bold text-black focus:outline-none border-b-2 border-gray-300 bg-[#E9E8E4]"
          />
        ) : (
          <h1
            className="text-xl font-bold text-black cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </h1>
        )}
        <Edit3
          className="h-5 w-5 text-gray-500 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </div>

      {/* Color Picker Section */}
      <div className="flex items-center justify-center mt-2 space-x-2">
        <span className="text-black font-medium">Color:</span>
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="cursor-pointer bg-[#E9E8E4]"
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="mt-2 w-[21.5rem] rounded-2xl h-[28rem]">
          <div
            className={`w-full h-[50px] rounded-t-2xl flex items-center justify-center`}
            style={{ backgroundColor: color }}
          >
            <h2 className="text-white font-semibold">
              Add, remove or reorder players
            </h2>
          </div>
          <div
            className={`w-full bg-[#f1f2f6] h-[80%] rounded-b-2xl shadow-lg flex flex-col items-start justify-between`}
          >
            <div className="w-full h-[80%] px-8 py-4 flex gap-3 flex-col items-start justify-start overflow-y-auto">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: player.user.color }}
                  >
                    {player.user.letter}
                  </div>
                  <h2 className="text-black font-semibold">{player.user.name}</h2>
                  <div className="flex gap-3 items-center">
                    <button>
                      <Edit3 className="text-black w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setPlayers(players.filter((_, i) => i !== index)); // Remove player
                      }}
                    >
                      <MdDeleteOutline className="text-black w-5 h-5" />
                    </button>
                    <input
                      type="color"
                      value={player.user.color}
                      onChange={(e) =>
                        handleColorForPlayer(index, e.target.value)
                      }
                      className="w-8 h-8"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-[20%] flex items-center justify-start py-4 px-4">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color }}
                onClick={() => setIsAddPlayerOpen(true)}
              >
                <Plus className="text-white" />
              </button>

              <h2 className="text-black mx-auto font-semibold">
                Add new players
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          className="px-8 py-0.5 -mt-4 rounded-full text-lg font-semibold text-white"
          style={{ backgroundColor: color }}
          onClick={() => {
            handleStart();
          }} // Save data to localStorage on Start
        >
          Start
        </button>
      </div>

      {isAddPlayerOpen && (
        <AddPlayer
          onClose={() => setIsAddPlayerOpen(false)}
          onAddPlayer={handleAddPlayer}
          color={color}
        />
      )}
    </div>
  );
};

export default CreateGroup;
