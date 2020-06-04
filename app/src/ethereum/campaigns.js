
// This file contains functions which interact with the specified campaign instances. 
const compiledCampaign = require("../ethereum/build/Campaign.json");

const {read, getWeb3} = require("./store.js");

const getCampaign = async(index, web3) => {

	return await read()
		.then( async (deployedCampaigns) => {
			
		//const web3 = await getWeb3();
		//console.log(deployedCampaigns)

		return await new web3.eth.Contract((JSON.parse(compiledCampaign.interface)), 
		deployedCampaigns[index]);

	});
}

const getCampaignDetails = async(address, web3) => {

	const campaign = await new web3.eth.Contract(compiledCampaign.Campaign.abi, 
	address);
	
	const name = await campaign.methods.name().call();
	const description = await campaign.methods.description().call();
	const manager = await campaign.methods.manager().call();
	const minContribution = await campaign.methods.minContribution().call();
	const approversCount = await campaign.methods.approversCount().call();
	
	const reqList = await getAllRequests(address, web3);
	
	console.log("before return")
	return {name, description, manager, minContribution, approversCount, reqList}
	console.log("after return")
}

const getAllRequests = async(address, web3) => {
	
	const campaign = await new web3.eth.Contract(compiledCampaign.Campaign.abi, 
		address);
	
	const accounts = await  web3.eth.getAccounts();
	
	const numReq = await campaign.methods.returnReqLenght().call();
	let reqList = [];	

	if(numReq > 0){
		let i = 0;
		for(i in numReq){
			const req = await campaign.methods.requests(i).call();		
			reqList.push(req);
		}
	}
	return reqList;
}

// Function to contribute to a campaign
const contribute = async(address, amount, web3) => {
	
	const campaign = await new web3.eth.Contract(compiledCampaign.Campaign.abi, 
		address);
	const accounts = await  web3.eth.getAccounts();

	await campaign.methods.contribute().send({
		from: accounts[0],
		value: amount
	});
	console.log("Approver Count- ", await campaign.methods.approversCount().call())
}

const createRequest = async(address, description, value, recipient , web3) => {
	
	const campaign = await new web3.eth.Contract(compiledCampaign.Campaign.abi, 
		address);
	
	const accounts = await  web3.eth.getAccounts();
	
	return await campaign.methods
			.createRequest(description, value, recipient)
			.send({
				from: accounts[0],
				gas: "3000000"
			});
}

const approveRequest = async(address, requestIndex, web3) => {
	
	const campaign = await new web3.eth.Contract(compiledCampaign.Campaign.abi, 
		address);
	
	const accounts = await  web3.eth.getAccounts();
	
	return await campaign.methods
			.approveRequest(requestIndex)
			.send({
				from: accounts[0],
				gas: "3000000"
			});
}

const finalizeRequest = async(address, requestIndex, web3) => {
	
	const campaign = await new web3.eth.Contract(compiledCampaign.Campaign.abi, 
		address);
	
	const accounts = await  web3.eth.getAccounts();
	
	return await campaign.methods
			.finalizeRequest(requestIndex)
			.send({
				from: accounts[0],
				gas: "3000000"
			});
}

//getCampaignDetails("0x0d7341cd3597A55E855C9e215797eD0FC80133C3", getWeb3()).then((val) => console.log(val))
//contribute("0x0d7341cd3597A55E855C9e215797eD0FC80133C3", 120000000000001, getWeb3()).then( () => console.log("Contribution Done"))
//createRequest("0x0d7341cd3597A55E855C9e215797eD0FC80133C3", "Paying the ktchen contractor", 100000000, "0x97dAbeb73196162c26c9f5F4763bD8c3AF569C1c", getWeb3()).then((val) => console.log(val.status))
//approveRequest("0x0d7341cd3597A55E855C9e215797eD0FC80133C3", 0, getWeb3()).then( (val) => console.log(val, "Request Approved"))
//finalizeRequest("0x0d7341cd3597A55E855C9e215797eD0FC80133C3", 0, getWeb3()).then( (val) => console.log(val, "Request Finalised"))

module.exports = {getCampaign, contribute, createRequest, approveRequest, finalizeRequest, getCampaignDetails, getAllRequests}