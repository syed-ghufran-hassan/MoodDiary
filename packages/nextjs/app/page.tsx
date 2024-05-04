"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount, useContractFunction, useContractCall, useScaffoldReadContract } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  // State for storing the mood value
  const [mood, setMood] = useState<string>("");

  // Function for updating the mood value
  const { send, state } = useContractFunction(MoodDiary, "setMood");

  // Function to handle mood input change
  const handleMoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(mood); // Call setMood function of the contract
  };

  // Read the mood value from the contract using the useContractCall hook
  const moodFromContract = useContractCall({
    abi: MoodDiary.interface,
    address: "YOUR_CONTRACT_ADDRESS", // Replace with your contract address
    method: "getMood",
  });

  // Read mood data using useScaffoldReadContract hook
  const { data: moodFromContract } = useScaffoldReadContract({
    contractName: "MoodDiary",
    functionName: "getMood",
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Mood Diary </span>
        </h1>
        <div className="flex justify-center items-center space-x-2">
          <p className="my-2 font-medium">Connected Address:</p>
          <Address address={connectedAddress} />
        </div>
        {/* Form for updating the mood */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={mood}
            onChange={handleMoodChange}
            placeholder="Enter your mood..."
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Mood
          </button>
        </form>
        {/* Displaying transaction status */}
        {state.status === "Mining" && (
          <p className="text-gray-500 mt-2">Transaction is being mined...</p>
        )}
        {state.status === "Success" && (
          <p className="text-green-500 mt-2">Mood updated successfully!</p>
        )}
        {state.status === "Exception" && (
          <p className="text-red-500 mt-2">{state.errorMessage}</p>
        )}
        {/* Displaying the mood from the contract */}
        <div className="mt-4">
          <p className="font-semibold">Current Mood:</p>
          {moodFromContract && <p>{moodFromContract}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
