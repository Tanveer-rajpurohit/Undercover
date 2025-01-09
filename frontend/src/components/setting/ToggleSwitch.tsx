interface ToggleSwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
  }
  
  export function ToggleSwitch({ checked = false, onChange }: ToggleSwitchProps) {
    return (
      <button 
        className={`w-12 h-6 rounded-full transition-colors ${checked ? 'bg-pink-500' : 'bg-gray-200'}`}
        onClick={() => onChange?.(!checked)}
      >
        <div 
          className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1 '
          }`} 
        />
      </button>
    );
  }
  
  