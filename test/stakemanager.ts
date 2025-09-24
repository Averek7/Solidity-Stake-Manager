import { expect } from "chai";
import { network } from "hardhat";
// import type { StakeManager } from "../types/ethers-contracts/StakeManager";
// import type { ERC20Stub } from "../types/ethers-contracts/ERC20Stub";
import "@nomicfoundation/hardhat-toolbox-mocha-ethers";

const { ethers } = await network.connect();

describe("StakeManager", function () {
  let erc: any, stake: any, owner: any, user: any, special: any;

  beforeEach(async () => {
    [owner, user, special] = await ethers.getSigners();

    const ERC = await ethers.getContractFactory("ERC20Stub");
    erc = await ERC.deploy();
    await erc.waitForDeployment(); // ✅ ethers v6 style

    const Stake = await ethers.getContractFactory("StakeManager");
    stake = await Stake.deploy(await erc.getAddress());
    await stake.waitForDeployment(); // ✅ ethers v6 style

    // mint some tokens to user
    await erc.mint(user.address, ethers.parseEther("100"));

    // set special caller
    await stake.connect(owner).setSpecialCaller(special.address);
  });

  it("allows staking and unstaking", async () => {
    await erc
      .connect(user)
      .approve(await stake.getAddress(), ethers.parseEther("50"));
    await stake.connect(user).stake(ethers.parseEther("10"));
    expect(await stake.stakes(user.address)).to.equal(ethers.parseEther("10"));

    await stake.connect(user).unstake(ethers.parseEther("5"));
    expect(await stake.stakes(user.address)).to.equal(ethers.parseEther("5"));

    const bal = await erc.balanceOf(user.address);
    expect(bal).to.equal(ethers.parseEther("95"));
  });

  it("only allows owner to set special caller", async () => {
    await expect(
      stake.connect(user).setSpecialCaller(user.address)
    ).to.be.revertedWith("Not owner");

    await stake.connect(owner).setSpecialCaller(user.address);
    expect(await stake.specialCaller()).to.equal(user.address);
  });


   it("special caller can burn from stake", async () => {
     await erc
       .connect(user)
       .approve(await stake.getAddress(), ethers.parseEther("20"));
     await stake.connect(user).stake(ethers.parseEther("20"));

     // First burn of 8
     await stake
       .connect(special)
       .burnFromStake(user.address, ethers.parseEther("8"));
     expect(await stake.stakes(user.address)).to.equal(ethers.parseEther("12"));

     // Second burn of 8
     await stake
       .connect(special)
       .burnFromStake(user.address, ethers.parseEther("8"));
     expect(await stake.stakes(user.address)).to.equal(ethers.parseEther("4")); 
   });


   it("only special caller can burn or tag", async () => {
     await expect(
       stake.connect(user).burnFromStake(user.address, 1)
     ).to.be.revertedWith("Not special caller");

     await expect(
       stake.connect(user).tagAddress(user.address, "")
     ).to.be.revertedWith("Not special caller");
   });

   it("emits AddressTagged event", async () => {
     await expect(
       stake
         .connect(special)
         .tagAddress("0x1b3aDCcb0120Ac114ABa0eB2E78E85311Cf354A4", "fraud-db")
     )
       .to.emit(stake, "AddressTagged")
       .withArgs("0x1b3aDCcb0120Ac114ABa0eB2E78E85311Cf354A4", "fraud-db");
   });

});
