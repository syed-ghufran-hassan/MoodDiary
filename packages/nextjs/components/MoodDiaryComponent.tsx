// components/MoodDiaryComponent.tsx
import React, { useState } from "react";
import { useContractFunction } from "wagmi";
import { MoodDiary } from "~~/contracts/MoodDiary"; // Assuming MoodDiary.sol is the smart contract

const MoodDiaryComponent: React.FC = () => {
  const [mood, setMood] = useState("");
  const { state: setMoodState, send: setMoodSend } = useContractFunction(MoodDiary, "setMood");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMood(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setMoodSend(mood);
    } catch (error) {
      console.error("Error setting mood:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Record Your Mood</h2>
      <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="Enter your mood"
          value={mood}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save
        </button>
      </form>
      {setMoodState && setMoodState.status === "Mining" && <p className="text-center mt-2">Saving mood...</p>}
      {setMoodState && setMoodState.status === "Success" && <p className="text-center mt-2 text-green-500">Mood saved successfully!</p>}
      {setMoodState && setMoodState.status === "Exception" && <p className="text-center mt-2 text-red-500">Error: {setMoodState.errorMessage}</p>}
    </div>
  );
};

export default MoodDiaryComponent;
