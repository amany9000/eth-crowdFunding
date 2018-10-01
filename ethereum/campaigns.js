
// This file contains functions which interact with the specified campaign instances. 
const compiledCampaign = require("../ethereum/build/Campaign.json");

const {read, getWeb3} = require("./store.js");

const getCampaign = async(index) => {

	return await read()
		.then( async (deployedCampaigns) => {
			
		const web3 = await getWeb3();
		const accounts = await  web3.eth.getAccounts();
		
		console.log(deployedCampaigns)
		
		return await new web3.eth.Contract((JSON.parse(compiledCampaign.interface)), 
		deployedCampaigns[index]);

	});

}

// Function to contribute to a campaign
const contribute = async(index, amount) => {
	
	const campaign = await getCampaign(index)
	//console.log(await campaign.methods.manager().call());
	
	const web3 = await getWeb3();
	const accounts = await  web3.eth.getAccounts();
	
	await campaign.methods.contribute().send({
		from: accounts[0],
		value: web3.utils.toWei("0.11","ether")
	});
	
	console.log("Approver Count- ", await campaign.methods.approversCount().call())
	
}

contribute(1, 124)