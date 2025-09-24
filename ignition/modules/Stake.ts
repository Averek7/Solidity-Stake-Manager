import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("StakeSystemModule", (m) => {
  // Deploy ERC20Stub
  const erc20 = m.contract("ERC20Stub");

  // Deploy StakeManager, passing ERC20 address to constructor
  const stakeManager = m.contract("StakeManager", [erc20]);

  // Example: mint some initial tokens to deployer (for testing/staking)
  m.call(erc20, "mint", [m.getAccount(0), 1000n * 10n ** 18n]);

  // Example: set special caller as account[1]
  m.call(stakeManager, "setSpecialCaller", [m.getAccount(1)]);

  return { erc20, stakeManager };
});
