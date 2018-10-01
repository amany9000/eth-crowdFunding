
// Compile script to store the camapaign and campaignStore contract object in build directory
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath= path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf-8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output){
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(":", "") + ".json"),
		output[contract]	
	);
}