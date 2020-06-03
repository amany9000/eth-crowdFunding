// Compile script to store the camapaign and projectStore contract object in build directory
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath= path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const projectPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(projectPath, "utf-8");

const input = {
    language: 'Solidity',
    sources: {
        'Campaign' : {
            content: source
        },
        'CampaignStore' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

fs.ensureDirSync(buildPath);
console.log(output)
for (let contract in output){
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(":", "") + ".json"),
		output[contract]	
	);
}