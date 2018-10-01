# eth-crowdFunding
An ethereum based Crowd Funding Application. The main functionalities provided by the smart contract are trust, transparency and consensus. The only way to use the contract's Eth is through ```approveRequest()``` and this function only executes the trasaction if more than 50 percent of the approvers(contributors) approve the trasaction request.   

## To Run 
* Clone the repository.  
 ``` cd eth-crowdFunding```
* Include the dependecies - 
``` node
npm install
```
* To deploy - 
``` node
node ethereum/deploy.js
```

## To check the smart contract 
* It is deployed on Ethereum's Rinkeby Test Network on the address - '0x97709358b13c070E20cbe0d314834244E1f0D834'.
* You can copy the smart contract <a href="http://remix.ethereum.org">here</a>.
* Compile and set the environment to "Injected Web3".
* Use the Test network address given above and click at "At Address" (after getting ether for the test network  <a href = "https://www.rinkeby.io/#faucet" >here</a>). This will geenrate a Campaign Store.
* To create a campaign instance use the  createCampaign button after providing the minimum contribution in the arguments.

## Note
* To deploy your own smart contract, first generate an API key at <a href = https://infura.io/>infura</a> 
* To check all the transaction of my deployed contract, check <a href = "https://rinkeby.etherscan.io/address/0x97709358b13c070e20cbe0d314834244e1f0d834">this</a>.

## To test
* Run - 
``` node 
npm test
```
* Testing is done through mocha and assert library.
