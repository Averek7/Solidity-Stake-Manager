import { network } from "hardhat";
const { ethers } = await network.connect();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // Deploy ERC20Stub
  const ERC20 = await ethers.getContractFactory("ERC20Stub");
  const erc = await ERC20.deploy();
  await erc.waitForDeployment();
  console.log("ERC20Stub deployed to:", await erc.getAddress());

  // Deploy StakeManager
  const Stake = await ethers.getContractFactory("StakeManager");
  const stake = await Stake.deploy(await erc.getAddress());
  await stake.waitForDeployment();
  console.log("StakeManager deployed to:", await stake.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
