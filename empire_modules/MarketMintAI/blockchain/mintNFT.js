<<<<<<< HEAD
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
=======
const { ethers } = require("ethers");
require("dotenv").config();

const abi = [
	  "function safeMint(address to, string memory uri) public"
	  ];

	  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
	  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
	  const contract = new ethers.Contract(process.env.NFT_CONTRACT, abi, wallet);

	  async function mintNFT(to, uri) {
	  	  try {
	  	  	    console.log("Minting NFT to:", to);
	  	  	        const tx = await contract.safeMint(to, uri);
	  	  	            await tx.wait();
	  	  	                console.log("✅ NFT minted successfully! TX Hash:", tx.hash);
	  	  	                    return tx.hash;
	  	  	                      } catch (err) {
	  	  	                      	    console.error("❌ Error minting NFT:", err);
	  	  	                      	        return null;
	  	  	                      	          }
	  	  	                      	          }

	  	  	                      	          if (require.main === module) {
	  	  	                      	          	  const args = process.argv.slice(2);
	  	  	                      	          	    if (args.length !== 2) {
	  	  	                      	          	    	    console.error("Usage: node mintNFT.js <toAddress> <metadataURI>");
	  	  	                      	          	    	        process.exit(1);
	  	  	                      	          	    	          }

	  	  	                      	          	    	            mintNFT(args[0], args[1]);
	  	  	                      	          	    	            }
>>>>>>> 986cad1 (✅ Merged GENIQX Supreme Core (without node_modules))
