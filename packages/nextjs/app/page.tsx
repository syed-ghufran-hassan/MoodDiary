"use client";
import React, { useState, useEffect } from "react";
//import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
//import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { ethers } from "ethers"; 

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  // State for storing the mood value
  const [mood, setMood] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [moodFromContract, setMoodFromContract] = useState<string | null>(null);

  // Function to handle mood input change
  const handleMoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if Ethereum provider is available
    if (typeof window.ethereum === 'undefined') {
      setTransactionStatus("Ethereum provider is not available. Please install a wallet extension or use a browser with Ethereum support.");
      return;
    }

    // Check if user is connected to the Ethereum provider
    if (!(window.ethereum as any).selectedAddress) {
      setTransactionStatus("Please connect your wallet to use this application.");
      return;
    }

    try {
      // Connect to the provider
      const provider = new ethers.BrowserProvider(window.ethereum)
      // Get the signer
      const signer = await provider.getSigner();

      // Extract the ABI from the artifact
      const contractABI = [
        {
          "inputs": [],
          "name": "getMood",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_mood",
              "type": "string"
            }
          ],
          "name": "setMood",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      // Create the contract instance
      const moodDiaryContract = new ethers.Contract(connectedAddress ?? "", contractABI, signer);

      // Call the setMood function
      const transaction = await moodDiaryContract.setMood(mood);
      // Wait for the transaction to be mined
      await transaction.wait();

      // Update transaction status
      setTransactionStatus("Mood updated successfully!");
      fetchMoodFromContract();
    } catch (error: any) {
  console.error("Error updating mood:", error);
  setTransactionStatus("Error updating mood: " + (error instanceof Error ? error.message : String(error)));
}
  };

  // Function to fetch mood from the contract
  const fetchMoodFromContract = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractABI = [
        {
          "inputs": [],
          "name": "getMood",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_mood",
              "type": "string"
            }
          ],
          "name": "setMood",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const moodDiaryContract = new ethers.Contract(connectedAddress, contractABI, provider);
      const mood = await moodDiaryContract.getMood();
      console.log(mood);
      setMoodFromContract(mood);
    } catch (error) {
      console.error("Error fetching mood from contract:", error);
      setMoodFromContract(null);
    }
  };

  // Fetch mood from contract when connectedAddress changes
  useEffect(() => {
    if (connectedAddress) {
      fetchMoodFromContract();
    }
  }, [connectedAddress]);

  // Wait for the window to load before interacting with window.ethereum
  useEffect(() => {
    window.addEventListener('load', () => {
      // Your code that interacts with window.ethereum
    });
  }, []);

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
