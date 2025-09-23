// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "./ERC20Stub.sol";

contract StakeManager {
    ERC20Stub public stakeToken;
    address public owner;
    mapping(address => uint256) public stakes;

    // special caller who can request burns and tag addresses
    address public specialCaller;


    event Staked(address indexed who, uint256 amount);
    event Unstaked(address indexed who, uint256 amount);
    event BurnedFromStake(address indexed who, uint256 amount);
    event AddressTagged(address indexed addr, string source);
    event SpecialCallerSet(address indexed caller);

    constructor(address tokenAddress) {
        stakeToken = ERC20Stub(tokenAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlySpecialCaller() {
        require(msg.sender == specialCaller, "Not special caller");
        _;
    }

    function setSpecialCaller(address caller) external onlyOwner {
        specialCaller = caller;
        emit SpecialCallerSet(caller);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        stakes[msg.sender] += amount;
        require(stakeToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "zero");
        require(stakes[msg.sender] >= amount, "not enough stake");

        stakes[msg.sender] -= amount;
        stakeToken.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }


    // called by special caller to burn a portion of a user's stake
    function burnFromStake(address who, uint256 amount) external onlySpecialCaller {
        require(stakes[who] >= amount, "not enough stake");
        stakes[who] -= amount;
        // burn tokens held by this contract
        stakeToken.burn(address(this), amount);
        emit BurnedFromStake(who, amount);
    }



    // emits the event AddressTagged which the subgraph will watch
    function tagAddress(address addr, string calldata source) external onlySpecialCaller {
      emit AddressTagged(addr, source);
    }
}
