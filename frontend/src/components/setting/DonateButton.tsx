import { Heart } from 'lucide-react';

interface DonateButtonProps {
  onClick: () => void;
}

export function DonateButton({ onClick }: DonateButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="group bg-white hover:bg-purple-50 transition-all duration-300 px-8 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 transform hover:scale-105"
    >
      <Heart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" />
      <span className="text-purple-600">Donate Now</span>
    </button>
  );
}
