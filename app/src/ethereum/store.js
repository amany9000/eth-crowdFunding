
// This file contains read() which returns a promise containing the contract instance of inbox
const Web3 = require("web3");
const hdWalletProvider = require("truffle-hdwallet-provider");
const compiledStore = require("../ethereum/build/CampaignStore.json");

const getWeb3 = (pass) => {
	const provider = new hdWalletProvider(
		"cousin wasp clip dynamic advance devote this million magic bean ceiling anger",
		"https://rinkeby.infura.io/v3/e8bccfbf91864d7ea8797b0ae8b2d30a"  // This address will be generated through infura 
	);
	const web3 = new Web3(provider);
	return web3;	
} 

const read = async (web3) => {

	//const web3 = await getWeb3();
	
	const accounts = await  web3.eth.getAccounts();
	const store = await new web3.eth.Contract((compiledStore.CampaignStore.abi), 
		"0x4821C44f7D6Ce357dd76Af1E99e136270Ab337A0");
	
	/*  Code to deploy a new camapign
	console.log("Deployed Camapigns Initially- ", await store.methods.getDeployedCampaigns().call())
	await store.methods.createCampaign(123).send(({gas: "1000000", from: accounts[0]}));	
	console.log("Deployed Camapigns After createCampaign() call- ", await store.methods.getDeployedCampaigns().call())
	*/

	return await store.methods.getDeployedCampaigns().call();
} 

const createCampaign = async (name, desp, min, web3) => {

	const accounts = await  web3.eth.getAccounts();
	const store = await new web3.eth.Contract((compiledStore.CampaignStore.abi), 
		"0x4821C44f7D6Ce357dd76Af1E99e136270Ab337A0");
	
	//Code to deploy a new camapign
	return await store.methods.createCampaign(name, desp, min).send(({gas: "1000000", from: accounts[0]}));	
}

createCampaign("Feeding India", "Feeding the Poor in Urban India", 120000000000000, getWeb3())

module.exports = {read, getWeb3, createCampaign};
