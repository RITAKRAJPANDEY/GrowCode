import React, { useState, ChangeEvent } from "react";
import LoginButton from "./LoginButton"
import { ffetchFeedbackService } from "../services/task.services";
import { useParams } from "next/navigation";
import { ReactFormState } from "react-dom/client";

export const DynamicColorSlider = () => {
  const [value, setValue] = useState<number>(50);
  const {date}=useParams<{date:string}>();
  
  const handelSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ffetchFeedbackService(date,value);
  }
  
  const hue = value * 1.2;
  const activeColor = `hsl(${hue}, 85%, 45%)`;

 

  return (
    <div className="p-6  border  bg-[#0f172a] border-zinc-800 rounded-2xl max-w-md mx-auto shadow-xl">
      {/* Header section tracking metric values */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-row ">

          <h1 className="text-[#34d399]">Give Feedback</h1>
          <pre className="text-xs">only for the non quantative tasks</pre>
        </div>
        <span
          className="text-xl font-black font-mono px-3 py-1 rounded-md transition-colors duration-150"
          style={{ color: activeColor }}
        >
          {String(value).padStart(3, "0")}%
        </span>
      </div>

      {/* Slider Track Wrapper */}
     
        <form onSubmit={handelSubmit}>
           <div className="relative flex gap-4 items-center  group">
          <input
            id="intensity-slider"
            type="range"
            min="0"
            max="100"
            value={value}
            
            onChange={(e)=>setValue(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-zinc-100 bg-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            style={{
              // Hardcoded linear matrix fallback ensures cross-browser background blending
              background: `linear-gradient(to right, hsl(30, 100%, 89%) 0%, hsl(0, 100%, 98%) 50%, hsl(120, 100%, 92%) 100%)`,
            }}
          />
          <LoginButton label={'submit'} />
      </div>
        </form>




    </div>
  );
};