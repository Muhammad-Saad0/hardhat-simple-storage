require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const RPC_URL = process.env.SEPOLIA_RPC_URL;
const ACCOUNT_PRIVATE_KEY =
  process.env.ACCOUNT_PRIVATE_KEY;
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    Sepolia: {
      url: RPC_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: "0.8.19",
};
