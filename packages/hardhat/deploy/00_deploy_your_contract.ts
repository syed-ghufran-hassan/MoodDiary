import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy the MoodDiary contract
  await deploy("MoodDiary", {
    from: deployer,
    log: true,
  });

  console.log("MoodDiary contract deployed!");

  // Optionally, interact with the deployed contract
  const moodDiary = await hre.ethers.getContract("MoodDiary", deployer);
  console.log("MoodDiary contract address:", moodDiary.address);
};

export default deployYourContract;

<<<<<<< HEAD
deployYourContract.tags = ["MoodDiary"];
=======
deployYourContract.tags = ["MoodDiary"];
>>>>>>> 27b79e144b0c6f5cbdb293d4da65c1bf7a2f83df
