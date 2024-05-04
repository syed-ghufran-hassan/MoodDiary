"use client";
import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { ethers } from "ethers"; 

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

// State for storing the mood value
  const [mood, setMood] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

 // Function to handle mood input change
  const handleMoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Connect to the provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Get the signer
      const signer = provider.getSigner();
      // Connect to the contract with the signer
      const moodDiaryContract = new ethers.Contract(connectedAddress, MoodDiary.interface, signer); // Use connectedAddress

      // Call the setMood function
      const transaction = await moodDiaryContract.setMood(mood);
      // Wait for the transaction to be mined
      await transaction.wait();

      // Update transaction status
      setTransactionStatus("Mood updated successfully!");
    } catch (error) {
      console.error("Error updating mood:", error);
      setTransactionStatus("Error updating mood: " + error.message);
    }
  };

  // Read the mood value from the contract using the useContractCall hook
  const moodFromContract = useContractCall({
    abi: MoodDiary.interface,
    address: connectedAddress, // Use connectedAddress
    method: "getMood",
  });

  // Read mood data using useScaffoldReadContract hook
  const { data: totalCounter } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "userGreetingCounter",
    args: [connectedAddress], // Pass connected address as argument
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
        {transactionStatus && <p className="mt-2">{transactionStatus}</p>}
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
