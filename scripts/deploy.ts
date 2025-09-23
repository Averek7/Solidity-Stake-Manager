import { network } from "hardhat";
const { ethers } = await network.connect();

async function main() {
  // const [deployer] = await ethers.getSigners();
  // console.log("Deploying contracts with:", deployer.address);

  // // Deploy ERC20Stub
  // const ERC20 = await ethers.getContractFactory("ERC20Stub");
  // const erc = await ERC20.deploy();
  // await erc.waitForDeployment();
  // console.log("ERC20Stub deployed to:", await erc.getAddress());

  // // Deploy StakeManager
  // const Stake = await ethers.getContractFactory("StakeManager");
  // const stake = await Stake.deploy(await erc.getAddress());
  // await stake.waitForDeployment();
  // console.log("StakeManager deployed to:", await stake.getAddress());

  const [deployer] = await ethers.getSigners();
  const stakeManagerAddress = "0x1b3aDCcb0120Ac114ABa0eB2E78E85311Cf354A4"; 

  const StakeManager = await ethers.getContractFactory("StakeManager");
  const stakeManager = StakeManager.attach(stakeManagerAddress);

  const targetAddr = "0x9Db62c5395b274B6589c2BCfCeAd35654eA8c386";
  const tx = await stakeManager
    .connect(deployer)
    .tagAddress(targetAddr, "manualFlag");
  console.log("Sent tx:", tx.hash);

  const receipt = await tx.wait();
  if (receipt) {
    console.log("Event emitted in block:", receipt.blockNumber);
  } else {
    console.log("No receipt returned from transaction.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});