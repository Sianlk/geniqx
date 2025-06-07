import { ethers } from 'ethers';
import 'dotenv/config';

const toAddress = process.argv[2];
const metadataURI = process.argv[3];

const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(process.env.CHAIN_RPC);
const wallet = new ethers.Wallet(privateKey, provider);

// Basic ERC721 ABI
const abi = [
  "function mint(address to, string memory uri) public returns (uint256)"
];

const contract = new ethers.Contract(process.env.NFT_CONTRACT, abi, wallet);

async function mint() {
  try {
    const tx = await contract.mint(toAddress, metadataURI);
    console.log("✅ Minting in progress... TX:", tx.hash);
    const receipt = await tx.wait();
    console.log("✅ Minted! Block:", receipt.blockNumber);
  } catch (error) {
    console.error("❌ Error minting:", error.message || error);
  }
}

mint();
