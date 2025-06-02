import { ethers } from 'ethers';
import 'dotenv/config';

const to = process.argv[2];
const uri = process.argv[3];

const provider = new ethers.JsonRpcProvider(process.env.CHAIN_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const abi = [
  "function mint(address to, string memory uri) public returns (uint256)"
];

const contract = new ethers.Contract(process.env.NFT_CONTRACT, abi, wallet);

async function mintNFT() {
  try {
    const tx = await contract.mint(to, uri);
    console.log("✅ Mint TX:", tx.hash);
    const receipt = await tx.wait();
    console.log("✅ Minted! Block:", receipt.blockNumber);
  } catch (err) {
    console.error("❌ Mint failed:", err.message || err);
  }
}

mintNFT();
