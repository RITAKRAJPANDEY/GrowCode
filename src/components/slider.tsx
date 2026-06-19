import React, { useState, ChangeEvent } from "react";

export const DynamicColorSlider: React.FC = () => {
  const [value, setValue] = useState<number>(50);

  // Mathematically maps 0-100 to HSL Hue angles (0 = Red, 60 = Yellow, 120 = Green)
  const hue = value * 1.2;
  const activeColor = `hsl(${hue}, 85%, 45%)`;

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="p-6  border  bg-[#020617] border-zinc-800 rounded-2xl max-w-md mx-auto shadow-xl">
      {/* Header section tracking metric values */}
      <div className="flex justify-between items-center mb-6">
        
        <span 
          className="text-xl font-black font-mono px-3 py-1 rounded-md transition-colors duration-150"
          style={{ color: activeColor }}
        >
          {String(value).padStart(3, "0")}%
        </span>
      </div>

      {/* Slider Track Wrapper */}
      <div className="relative flex items-center group">
        <input
          id="intensity-slider"
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-zinc-100 bg-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          style={{
            // Hardcoded linear matrix fallback ensures cross-browser background blending
            background: `linear-gradient(to right, hsl(0, 88%, 62%) 0%, hsl(60, 81%, 76%) 50%, hsl(120, 100%, 72%) 100%)`,
          }}
        />
      </div>

    
    </div>
  );
};