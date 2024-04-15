<div align="center">
  <a href="https://optimism.io"><img alt="Optimism" src="https://raw.githubusercontent.com/ethereum-optimism/brand-kit/main/assets/svg/OPTIMISM-R.svg" width=320></a>
  <br />
  <br />
</div>

# 🏗🔴 Scaffold-OP

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

Scaffold-OP is a fork of Scaffold-ETH2 with minimal differences, providing additional dApp examples, native support for Superchain testnets, and more low-level instructions. We highly recommend the Scaffold-ETH2 docs as the primary guideline.

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/ethereum-optimism/scaffold-op/blob/main/packages/nextjs/public/scaffold-op-landing.png)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-OP, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/ethereum-optimism/scaffold-op.git
cd scaffold-op
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On the same terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Deploy Contracts to Superchain Testnet(s)

To deploy contracts to a remote testnet (e.g. Optimism Sepolia), follow the steps below:

1. Get Superchain Sepolia ETH from the [Superchain Faucet](https://app.optimism.io/faucet)

2. Inside the `packages/hardhat` directory, copy `.env.example` to `.env`.

   ```bash
   cd packages/hardhat && cp .env.example .env
   ```

3. Edit your `.env` to specify the environment variables. Only specifying the`DEPLOYER_PRIVATE_KEY` is necessary here. The contracr will be deployed from the address associated with this private key, so make sure it has enough Sepolia ETH.

   ```bash
   DEPLOYER_PRIVATE_KEY = "your_private_key_with_sepolia_ETH";
   ```

4. Inside `scaffold-op`, run

   ```bash
   yarn deploy --network-options
   ```

   Use spacebar to make your selection(s). This command deploys all smart contracts in `packages/hardhat/contracts` to the selected network(s). Alternatively, you can try

   ```bash
   yarn deploy --network networkName
   ```

   Network names are found in `hardhat.config.js`. Please ensure you have enough Sepolia ETH on all these Superchains. If the deployments are successful, you will see the deployment tx hash on the terminal.

## Adding Foundry

Hardhat's NodeJS stack and cleaner deployment management makes it a better default for Scaffold-OP.

To add Foundry to Scaffold-OP, follow this simple [tutorial](https://hardhat.org/hardhat-runner/docs/advanced/hardhat-and-foundry) by Hardhat. We recommend users who want more robust and faster testing to add Foundry.

## User Journey 

##Onboarding and Account Creation:

User arrives at the mood diary application and is prompted to connect their digital wallet (e.g., MetaMask) to interact with the Ethereum blockchain.
If the user is new, they create a new account by signing a transaction with their digital wallet, which generates a unique Ethereum address for them.
If the user is returning, they connect their existing digital wallet to access their account.
Smart Contract Deployment:

Upon account creation or first login, the mood diary application deploys a smart contract to the Ethereum blockchain to store mood entries securely.
The smart contract is associated with the user's Ethereum address and serves as the decentralized backend for storing and managing mood data.

##Adding a Mood Entry:

The user interacts with the mood diary application's interface to add a new mood entry.
The application prompts the user to sign a transaction with their digital wallet to record the mood entry on the Ethereum blockchain.
The mood entry, along with metadata such as the date, time, and mood type, is stored securely in the user's smart contract.

##Viewing and Interacting with Mood Entries:

The user can view their past mood entries through the mood diary application's interface.
Mood entries are retrieved from the user's smart contract on the Ethereum blockchain and displayed in a user-friendly format.
Users can interact with their mood entries, such as editing or deleting them, by signing transactions with their digital wallet to update the smart contract state.

##Blockchain Verification and Immutability:

Each mood entry recorded on the Ethereum blockchain is immutable and verifiable.
Users can verify the authenticity and integrity of their mood data by accessing the blockchain directly or through blockchain explorers.
The decentralized nature of the blockchain ensures that mood entries cannot be tampered with or altered by any single entity.

##Smart Contract Integration with Other Services:

The mood diary application leverages smart contract functionality to integrate with other decentralized services or protocols.
For example, users may opt to encrypt their mood entries using decentralized encryption services, store backups of their mood data on decentralized storage networks like IPFS, or trigger automated actions based on mood data through decentralized autonomous organizations (DAOs).
Privacy and Data Ownership:

Users retain full control and ownership of their mood data stored on the Ethereum blockchain.
The mood diary application implements privacy-preserving features, such as encryption and zero-knowledge proofs, to protect sensitive user data from unauthorized access.
Users can selectively share access to their mood data with trusted individuals or applications through permissioned smart contract interactions.

##Gas Fees and Transaction Costs:

Users are responsible for paying gas fees associated with interacting with smart contracts on the Ethereum blockchain.
The mood diary application provides transparency regarding gas fees and allows users to adjust transaction parameters (e.g., gas price, gas limit) to optimize cost and transaction speed.
Community Engagement and Governance:

The mood diary application fosters community engagement and participation through decentralized governance mechanisms.
Users can participate in governance processes, such as proposing and voting on improvements to the application, through decentralized governance tokens or voting mechanisms integrated with smart contracts.
Continuous Improvement and Upgrades:

The development team continuously monitors and updates the smart contracts powering the mood diary application to ensure security, scalability, and compatibility with evolving blockchain standards.
Users are notified of smart contract upgrades and have the option to migrate their mood data to updated contract versions while maintaining data integrity and privacy.

## Documentation

We highly recommend visiting the original [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out their [website](https://scaffoldeth.io).
