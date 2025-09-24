import { network } from "hardhat";
const { ethers } = await network.connect();

process.env.USER_KEY = process.env.USER_KEY || "";

async function main() {
  const [deployer] = await ethers.getSigners();
  const user = new ethers.Wallet(process.env.USER_KEY, ethers.provider);

  const tokenAddr = "0x9585d2e5ef4Ec3d2C9DcE4941C4690A5468c7fE6";
  const stakeManagerAddr = "0x6b0D3Ff9c56EB81695E4935b069FaE9454f35A2";

  const token = await ethers.getContractAt("ERC20Stub", tokenAddr);
  const stakeManager = await ethers.getContractAt(
    "StakeManager",
    stakeManagerAddr
  );

  const approveAmount = ethers.parseEther("50");
  const stakeAmount = ethers.parseEther("10");

  // Transfer tokens to user
  // console.log("Transfer tokens...");
  // const transferTx = await token
  // .connect(deployer)
  // .transfer(user.address, approveAmount);
  // await transferTx.wait();
  // console.log(`Transferred ${approveAmount.toString()} tokens to ${user.address}`);

  // console.log("Staking tokens...");
  // Approve stake manager
  // const approveTx = await token
  //   .connect(user)
  //   .approve(stakeManager.address, approveAmount);
  // await approveTx.wait();
  // console.log(`Approved ${stakeAmount.toString()} tokens for StakeManager`);

  // Stake
  // const stakeTx = await stakeManager.connect(user).stake(stakeAmount);
  // await stakeTx.wait();
  // console.log(`Staked ${stakeAmount.toString()} tokens`);

  //Set Special Caller
  const specialCallerAddress = user.address;
  const specialTx = await stakeManager
    .connect(deployer)
    .setSpecialCaller(specialCallerAddress);
  await specialTx.wait();
  console.log(`Special Caller ${specialCallerAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
