
const assert = require("assert");
const ganache require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledStore = require("../ethereum/build/CamapaignStore.json");
const compiledCampaign = require("../ethereum/build/Camapaign.json");

let accounts;
let factory;
let CampaignAddress;

beforeEach(async() => {
	accounts = await web3.eth.getAccounts();
	store = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))	
			.deploy({data: compiledCampaign.bytecode})
			.send({from: accounts[0]}, gas:"1000000");	

	await store.methods.createCampaign("100").send({
		from: account[0],
		gas: "1000000"
	});

	[CampaignAddress] = store.methods.getDeployedCampaigns().call();
	camapaign = await new web3.eth.Contract(
		JSON.parse(compiledCampaign.interface),
		CampaignAddress 
	);
}); 