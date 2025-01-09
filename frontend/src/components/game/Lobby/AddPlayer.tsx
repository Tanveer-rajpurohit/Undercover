import { useState } from 'react';

const AddPlayer = ({ onClose, onAddPlayer, color }: { onClose: () => void, onAddPlayer: (name: string) => void, color: string }) => {
  const [name, setName] = useState('');

  const handleAddPlayer = () => {
    if (name.trim()) {
      onAddPlayer(name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Player</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter player name"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button
            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
            style={{ backgroundColor: color }}
            onClick={handleAddPlayer}
          >
            Add Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlayer;