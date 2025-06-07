{
  "name": "geniqx-nft",
  "version": "1.0.0",
  "type": "module",
  "main": "mintNFT.ts",
  "scripts": {
    "start": "ts-node mintNFT.ts",
    "deploy": "bash deploy_chain.sh"
  },
  "private": true,
  "dependencies": {
    "ethers": "^6.14.3",
    "dotenv": "^16.3.1"
  }
}
