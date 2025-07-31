require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');

// Load environment variables
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(process.env.CHAIN_RPC);
const wallet = new ethers.Wallet(privateKey, provider);

// Save wallet data
const walletData = {
	  address: wallet.address,
	    publicKey: wallet.publicKey
	    };

	    fs.mkdirSync('./wallet', { recursive: true });
	    fs.writeFileSync('./wallet/wallet.json', JSON.stringify(walletData, null, 2));

	    console.log(`✅ Wallet loaded: ${wallet.address}`)
}
