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
// ERC20Stub deployed to: 0x9585d2e5ef4Ec3d2C9DcE4941C4690A5468c7fE6
// StakeManager deployed to: 0x6b0D3Ff9c56EB81695E4935b069FaE9454f35A27
