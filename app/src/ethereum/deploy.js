
// This is a file to deploy the compiled factory contract at .build/CampaignStore.json
const hdWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledStore = require("../ethereum/build/CampaignStore.json");

const provider = new hdWalletProvider(
	"cousin wasp clip dynamic advance devote this million magic bean ceiling anger",
	"https://sepolia.infura.io/v3/49ef474343844958a068e4f01ad0b2d5"
);

const web3 = new Web3(provider);


const deploy = async () => {
	web3.eth.getGasPrice().then( async (val) => { 
		//console.log(val, compiledStore.CampaignStore.abi, compiledStore.CampaignStore.evm.bytecode.object)
		const accounts = await  web3.eth.getAccounts();
	
		console.log("Attempting to deploy from account ", accounts[0]);
	
		const result = await new web3.eth.Contract(compiledStore.CampaignStore.abi)
			.deploy({data: "0x" + compiledStore.CampaignStore.evm.bytecode.object})
			.send({gas: "2000000", gasPrice: val, from: accounts[0]});
	
		console.log("Whoooopiii!!!, The contract Deployed at ", result.options.address);	
	})
}
  
deploy();