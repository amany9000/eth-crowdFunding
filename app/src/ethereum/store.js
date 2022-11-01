
// This file contains read() which returns a promise containing the contract instance of inbox
const Web3 = require("web3");
const hdWalletProvider = require("@truffle/hdwallet-provider");
const compiledStore = require("../ethereum/build/CampaignStore.json");
const {getCampaignDetails} = require("./campaigns.js");

const getWeb3 = (pass) => {
	const provider = new hdWalletProvider(
		pass,
		"https://sepolia.infura.io/v3/49ef474343844958a068e4f01ad0b2d5"  //This address will be generated through infura
	);
	const web3 = new Web3(provider);
	return web3;	
} 

const getAllCampaigns = async (web3) => {
	
	const store = await new web3.eth.Contract((compiledStore.CampaignStore.abi),
		"0xBc120f40e6F629Bb5afd28a61B2EE8ac2115f5da");

	let addresses =  await store.methods.getDeployedCampaigns().call();
	const deployedCampaigns = [];

	for (let i in addresses){
		const camp = getCampaignDetails(addresses[i], web3);
		deployedCampaigns.push(camp);
	}

	return deployedCampaigns.reverse();
} 

const createCampaign = async (name, desp, min, web3) => {

	const accounts = await  web3.eth.getAccounts();
	const store = await new web3.eth.Contract((compiledStore.CampaignStore.abi), 
		"0xBc120f40e6F629Bb5afd28a61B2EE8ac2115f5da");
	
	//Code to deploy a new camapign
	return await store.methods.createCampaign(name, desp, web3.utils.toWei(min.toString(),'finney'))
		.send(({gas: "1000000", from: accounts[0]}));	
}

//createCampaign("Feeding India", "Feeding the Poor in Urban India", 120000000000000, getWeb3())
//getAllCampaigns(getWeb3()).then(console.log)

export {createCampaign, getAllCampaigns};
