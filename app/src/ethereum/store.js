
// This file contains read() which returns a promise containing the contract instance of inbox
const Web3 = require("web3");
const hdWalletProvider = require("@truffle/hdwallet-provider");
const compiledStore = require("../ethereum/build/CampaignStore.json");
const {getCampaignDetails} = require("./campaigns.js");

const getWeb3 = (pass) => {
	const provider = new hdWalletProvider(
		pass,
		"https://rinkeby.infura.io/v3/e8bccfbf91864d7ea8797b0ae8b2d30a"  //This address will be generated through infura
	);
	const web3 = new Web3(provider);
	return web3;	
} 

const getAllCampaigns = async (web3) => {
	
	const store = await new web3.eth.Contract((compiledStore.CampaignStore.abi),
		"0x1Fe17149D483E0f07D2b5c3D5BACb6e328f5839F");

	const addresses =  await store.methods.getDeployedCampaigns().call();
	const deployedCampaigns = [];

	addresses.reverse().forEach( (address) => {
		const camp = getCampaignDetails(address, web3);
		deployedCampaigns.push(camp);
	})
	return deployedCampaigns;
} 

const createCampaign = async (name, desp, min, web3) => {

	const accounts = await  web3.eth.getAccounts();
	const store = await new web3.eth.Contract((compiledStore.CampaignStore.abi), 
		"0x1Fe17149D483E0f07D2b5c3D5BACb6e328f5839F");
	
	//Code to deploy a new camapign
	return await store.methods.createCampaign(name, desp, min).send(({gas: "1000000", from: accounts[0]}));	
}

//createCampaign("Feeding India", "Feeding the Poor in Urban India", 120000000000000, getWeb3())
//getAllCampaigns(getWeb3()).then(console.log)

export {createCampaign, getAllCampaigns};
