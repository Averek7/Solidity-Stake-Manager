import dotenv from "dotenv";
// import { configVariable } from "hardhat/config";
import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

dotenv.config();
const { API_KEY, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: API_KEY ? `https://arb-sepolia.g.alchemy.com/v2/${API_KEY}` : "",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    arbitumSepolia: {
      type: "http",
      chainType: "l1",
      url: API_KEY ? `https://arb-sepolia.g.alchemy.com/v2/${API_KEY}` : "",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
  },
};

export default config;


// Deploying contracts with: 0x9Db62c5395b274B6589c2BCfCeAd35654eA8c386
// ERC20Stub deployed to: 0x6c26e052d97dbE6763643E14FB8C9A23Ef32C7EE
// StakeManager deployed to: 0xe1931272dDbaC1110575c0762F3FDB845e6d4A74