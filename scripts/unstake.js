import { network } from "hardhat";
const { ethers } = await network.connect();

async function main() {
  const [, user] = await ethers.getSigners();

  const stakeManagerAddr = "0x6b0D3Ff9c56EB81695E4935b069FaE9454f35A2";
  const StakeManager = await ethers.getContractFactory("StakeManager");
  const stakeManager = StakeManager.attach(stakeManagerAddr);

  const amount = ethers.parseEther("5");

  const tx = await stakeManager.connect(user).unstake(amount);
  await tx.wait();
  console.log(`User ${user.address} unstaked ${amount}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});