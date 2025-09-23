import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("StakeManager", function () {
  let erc: any, stake: any, owner: any, user: any, special: any;

  beforeEach(async () => {
    [owner, user, special] = await ethers.getSigners();

    const ERC = await ethers.getContractFactory("ERC20Stub");
    erc = await ERC.deploy();
    await erc.deployed();

    const Stake = await ethers.getContractFactory("StakeManager");
    stake = await Stake.deploy(erc.address);
    await stake.deployed();

    // mint some tokens to user
    await erc.mint(user.address, ethers.utils.parseEther("100"));

    // set special caller
    await stake.connect(owner).setSpecialCaller(special.address);
  });

  it("allows staking and unstaking", async () => {
    await erc
      .connect(user)
      .approve(stake.address, ethers.utils.parseEther("50"));
    await stake.connect(user).stake(ethers.utils.parseEther("10"));
    expect(await stake.stakes(user.address)).to.equal(
      ethers.utils.parseEther("10")
    );

    await stake.connect(user).unstake(ethers.utils.parseEther("5"));
    expect(await stake.stakes(user.address)).to.equal(
      ethers.utils.parseEther("5")
    );

    const bal = await erc.balanceOf(user.address);
    // user had 100 minted, staked 10, got back 5 → 95
    expect(bal).to.equal(ethers.utils.parseEther("95"));
  });

  it("special caller can burn from stake", async () => {
    await erc
      .connect(user)
      .approve(stake.address, ethers.utils.parseEther("20"));
    await stake.connect(user).stake(ethers.utils.parseEther("20"));
    expect(await stake.stakes(user.address)).to.equal(
      ethers.utils.parseEther("20")
    );

    // special burns 8
    await stake
      .connect(special)
      .burnFromStake(user.address, ethers.utils.parseEther("8"));
    expect(await stake.stakes(user.address)).to.equal(
      ethers.utils.parseEther("12")
    );
  });

  it("only special caller can burn or tag", async () => {
    await expect(
      stake.connect(user).burnFromStake(user.address, 1)
    ).to.be.revertedWith("Not special caller");

    await expect(
      stake.connect(user).tagAddress(user.address, "0x01")
    ).to.be.revertedWith("Not special caller");
  });
});
