# Stake Manager Demo

Minimal Hardhat + Subgraph scaffold:

- **ERC20Stub** token (minted to deployer)
- **StakeManager** where users can stake tokens
- A special caller can "tag" addresses and burn part of their stake
- Subgraph indexes on-chain `AddressTagged` events and exposes a simple GraphQL query

---

## 1. Contracts

- **ERC20Stub** deployed: [`0x9585d2e5ef4Ec3d2C9DcE4941C4690A5468c7fE6`](https://sepolia.arbiscan.io/address/0x9585d2e5ef4Ec3d2C9DcE4941C4690A5468c7fE6)
- **StakeManager** deployed: [`0x6b0D3Ff9c56EB81695E4935b069FaE9454f35A2`](https://sepolia.arbiscan.io/address/0x6b0D3Ff9c56EB81695E4935b069FaE9454f35A2)

---

## 2. Setup

```bash
git clone <this-repo>
cd stake-manager
npm install
```

---

## 3. Env

```bash
API_URL=https://arb-sepolia.g.alchemy.com/v2/<YOUR_KEY>
PRIVATE_KEY=0x<your_private_key>
```

---

## 4. Deploy

```bash
npx hardhat compile
npx hardhat run scripts/deploy.ts --network arbitrumSepolia
```

---

## 5. How to stake

```bash
const erc20 = await ethers.getContractAt("ERC20Stub", "<ERC20_ADDRESS>");
const stakeManager = await ethers.getContractAt("StakeManager", "<STAKE_MANAGER_ADDRESS>");

// approve tokens
await erc20.approve(stakeManager.address, ethers.utils.parseEther("100"));

// stake tokens
await stakeManager.stake(ethers.utils.parseEther("100"));
```

---

## 6. Trigger a Burn

```bash
// burn 50 tokens from a staker
await stakeManager.burnStaker("0xStakerAddress", ethers.utils.parseEther("50"), "fraud-detection");
```

---

## 7. Subgraph

- Subgraph indexes AddressTagged events.

- Query endpoint: https://api.studio.thegraph.com/query/121495/subgraph/v0.0.1
- Example with Transfer query
<img width="750" height="237" alt="image" src="https://github.com/user-attachments/assets/af221bb9-19d8-40c1-98a7-32bd3864d17d" />


## 8. Tests
