
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

const contribute = async(index, amount) => {
	
	getCampaign(1).then(async (campaign) => {
		console.log(await campaign.methods.manager().call());
	})
}

contribute(1, 123)