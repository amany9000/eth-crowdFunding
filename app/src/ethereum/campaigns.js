
// This file contains functions which interact with the specified campaign instances. 
const compiledCampaign = require("../ethereum/build/Campaign.json");

const {read} = require("./store.js");

const getCampaign = async(index, web3) => {

	return await read()
		.then( async (deployedCampaigns) => {
			
		//const web3 = await getWeb3();
		
		console.log(deployedCampaigns)
		
		return await new web3.eth.Contract((JSON.parse(compiledCampaign.interface)), 
		deployedCampaigns[index]);

	});

}

const getCampaignDetails = async(address, web3) => {
	
	//console.log("get", address, web3)
	const accounts = await  web3.eth.getAccounts();		
	
	const campaign = await new web3.eth.Contract((JSON.parse(compiledCampaign.interface)), 
	address);
	
	const name = await campaign.methods.name().call();
	const description = await campaign.methods.description().call();
	const manager = await campaign.methods.manager().call();
	const minContribution = await campaign.methods.minContribution().call();
	const approversCount = await campaign.methods.approversCount().call();

	//console.log(request)
	let i = 0;
	
	const deployedReq = await initiative.methods.getDeployedRequests().call();

	const reqDetailList = [];
		for(i in deployedReq){		
			const req = await new web3.eth.Contract((JSON.parse(compiledReq.interface)), 
			deployedReq[i]);

			const description = await req.methods.description().call();
			const value = await req.methods.value().call();

			reqDetailList.push({
				address: deployedReq[i],
				description,
				value
			});
			// delete description,value;
		}
	return {name, description, manager, minContribution}
}

// Function to contribute to a campaign
const contribute = async(index, amount, web3) => {
	
	const campaign = await getCampaign(index)
	//console.log(await campaign.methods.manager().call());
	
	//const web3 = await getWeb3();
	const accounts = await  web3.eth.getAccounts();
	
	await campaign.methods.contribute().send({
		from: accounts[0],
		value: web3.utils.toWei(amount, "finney")
	});
	
	console.log("Approver Count- ", await campaign.methods.approversCount().call())
	
}

const createRequest = async(index, description, value, recipient , web3) => {
	
	const campaign = await getCampaign(index)
	//console.log(await campaign.methods.manager().call());
	
	const accounts = await  web3.eth.getAccounts();
	
	return await campaign.methods
			.createRequest(description, value, recipient)
			.send({
				from: accounts[0],
				gas: "3000000"
			});
}

const approveRequest = async(campaignIndex, requestIndex, web3) => {
	
	const campaign = await getCampaign(campaignIndex)
	//console.log(await campaign.methods.manager().call());
	
	const accounts = await  web3.eth.getAccounts();
	
	return await campaign.methods
			.approveRequest(requestIndex)
			.send({
				from: accounts[0],
				gas: "3000000"
			});
}

const finalizeRequest = async(campaignIndex, requestIndex, web3) => {
	
	const campaign = await getCampaign(campaignIndex)
	//console.log(await campaign.methods.manager().call());
	
	const accounts = await  web3.eth.getAccounts();
	
	return await campaign.methods
			.finalizeRequest(requestIndex)
			.send({
				from: accounts[0],
				gas: "3000000"
			});
}

module.exports = {getCampaign, contribute, createRequest, approveRequest, finalizeRequest, getCampaignDetails}