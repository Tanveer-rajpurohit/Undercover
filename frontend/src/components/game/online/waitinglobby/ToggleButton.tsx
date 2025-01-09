import { useState } from "react";

  
  export function ToggleButton() {

    const [checked, setChecked] = useState(false);
    return (
      <button 
        className={`w-12 h-6 rounded-full transition-colors ${checked ? 'bg-[#38DE7D]' : 'bg-gray-300'}`}
        onClick={() => setChecked(!checked)}
      >
        <div 
          className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1 '
          }`} 
        />
      </button>
    );
  }
  
  