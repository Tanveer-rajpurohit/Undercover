interface GameCardProps {
    host: string;
    players: number;
    status: 'started' | 'waiting';
    countryFlag: string;
    handleJoinGame: () => void;
  }
  
  export function GameCard({ host, players, status, countryFlag ,handleJoinGame}: GameCardProps) {
    return (
      <div className={`
        rounded-xl p-4 flex items-center justify-between
        ${status === 'started' ? 'bg-green-100' : 'bg-white'}
      `} onClick={handleJoinGame}>
        <div className="flex items-center gap-3">
          <img 
            src={countryFlag} 
            alt="Country flag" 
            className="w-6 h-6 rounded-lg"
          />
          <div>
            <h3 className="font-medium">{host}</h3>
            <span className="text-sm text-green-600">
              {status === 'started' ? 'Started' : 'Waiting'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{players}</span>
          
        </div>
      </div>
    );
  }
  
  