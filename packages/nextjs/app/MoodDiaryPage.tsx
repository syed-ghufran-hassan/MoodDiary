import { useState } from "react";
import { ethers } from "ethers";
import { MoodDiary } from "../contracts/MoodDiary.sol"; // Assuming you've compiled and deployed the MoodDiary contract

const MoodDiaryPage = () => {
  const [mood, setMood] = useState<string>("");
  const [connectedAddress, setConnectedAddress] = useState<string>("");

  // Connect to the smart contract
  const connectToContract = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "<Your MoodDiary contract address>";
      const contract = new ethers.Contract(contractAddress, MoodDiary.abi, signer);
      const address = await signer.getAddress();
      setConnectedAddress(address);
    } else {
      console.error("MetaMask not installed");
    }
  };

  // Function to set mood in the smart contract
  const setMoodInContract = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "<Your MoodDiary contract address>";
      const contract = new ethers.Contract(contractAddress, MoodDiary.abi, signer);
      try {
        await contract.setMood(mood);
        console.log("Mood set successfully");
      } catch (error) {
        console.error("Error setting mood:", error);
      }
    } else {
      console.error("MetaMask not installed");
    }
  };

  // Function to get mood from the smart contract
  const getMoodFromContract = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "<Your MoodDiary contract address>";
      const contract = new ethers.Contract(contractAddress, MoodDiary.abi, provider);
      try {
        const mood = await contract.getMood();
        console.log("Current mood:", mood);
      } catch (error) {
        console.error("Error getting mood:", error);
      }
    } else {
      console.error("MetaMask not installed");
    }
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Mood Diary 📝😊</span>
        </h1>
        <div className="flex justify-center items-center space-x-2">
          <p className="my-2 font-medium">Connected Address:</p>
          <p>{connectedAddress}</p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <input
            type="text"
            placeholder="Enter your mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
          <button onClick={setMoodInContract}>Set Mood</button>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <button onClick={getMoodFromContract}>Get Mood</button>
        </div>
      </div>
    </div>
  );
};

export default MoodDiaryPage;
