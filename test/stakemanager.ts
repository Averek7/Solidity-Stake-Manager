import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("StakeManager", function () {
  let erc: any, stake: any, owner: any, user: any, special: any;

  beforeEach(async function () {
    [owner, user, special] = await ethers.getSigners();

    const ERC = await ethers.getContractFactory("MockERC20");
    erc = await ERC.deploy("MockToken", "MTK", 18);
    await erc.deployed();

    const StakeManager = await ethers.getContractFactory("StakeManager");
    stake = await StakeManager.deploy(erc.address);
    await stake.deployed();

    // Mint some tokens to user and special
    // await erc.mint(user.address, ethers.utils.parseEther("1000"));
    // await erc.mint(special.address, ethers.utils.parseEther("1000"));
    await stake.connect(owner).setSpecialCaller(special.address, true);
  });

  it("should allow user to stake tokens", async function () {
    // await erc.connect(user).approve(stake.address, ethers.utils.parseEther("500"));
    // await stake.connect(user).stake(ethers.utils.parseEther("500"));
    // expect(await stake.stakedBalance(user.address)).to.equal(ethers.utils.parseEther("500"));
  });
});
