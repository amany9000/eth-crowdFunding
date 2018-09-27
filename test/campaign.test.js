
const assert = require("assert");
const ganache =  require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledStore = require("../ethereum/build/CampaignStore.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let store;
let campaign;
let CampaignAddress;

beforeEach(async() => {
	accounts = await web3.eth.getAccounts();
	store = await new web3.eth.Contract(JSON.parse(compiledStore.interface))	
			.deploy({data: compiledStore.bytecode})
			.send({from: accounts[0], gas:"1000000"});	

	await store.methods.createCampaign("100").send({
		from: accounts[0],
		gas: "1000000"
	});

	const address = await store.methods.getDeployedCampaigns().call();
	CampaignAddress  = address[0];
	campaign = await new web3.eth.Contract(
		JSON.parse(compiledCampaign.interface),
		CampaignAddress 
	);
	console.log("hey",CampaignAddress)
}); 

describe("Campaign", ()=> {

	it("deploys a store and a campaign", () => {
		
		assert.ok(store.options.address);
		assert.ok(campaign.options.address)
	
	});

	it("ensures the caller is the campaign manager", async () => {
		
		const manager = await campaign.methods.manager().call()
		assert.equal(accounts[0], manager)
	
	})

	it("allows people to contribute and add them as aprovers", async() => {

		await campaign.methods.contribute().send({
			value: "200",
			from: accounts[1]
		})

		const isApprover = await campaign.methods.approvers(accounts[1]).call();
		assert(isApprover);
	})
});