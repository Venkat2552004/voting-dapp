
# Voting-dapp

This is an decentralized voting application built using BLOCKCHAIN Technology


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Blockchain, ether js , hardhat

**Testnet:** Ganache 


## Run Locally

Clone the project

```bash
  git clone https://github.com/Venkat2552004/voting-dapp.git
```

Go to the project directory

```bash
  cd voting-dapp
```

Install dependencies

```bash
  npm install
```
Compile and Deploy Smart Contract

```bash
  npx hardhat run scripts/deploy.js --network 'your_network'
```
#
Copy the address from console and use it as ContactAddress
#

Run the app
```bash
  npm run dev
  ```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ContactAddress` - will be printed on console after deploying the contract

`ContractAbi` - can be found in contract_name.json under artifacts folder


## Optimizations

To better understand, instead of using ether js module, learn and implement the project using web3 module.

