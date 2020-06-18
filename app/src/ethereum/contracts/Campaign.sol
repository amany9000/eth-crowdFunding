// SPDX-License-Identifier: MIT
pragma solidity ^0.6.8;

contract CampaignStore {
    address[] public deployedCampaigns;
    
    function createCampaign( string memory campaignName, string memory campaignDescription, uint min) public{
        
        address newCampaign = address(new Campaign(campaignName, campaignDescription, min, msg.sender));
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request{
        string requestDescription;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;

    string public name;
    string public description;
    address public manager;
    uint public minContribution;
    uint public approversCount;

    
    mapping (address => bool) public approvers;

    constructor (string memory campaignName, string memory campaignDescription, uint minimum, address creator) public{
        name = campaignName;
        description = campaignDescription;
        manager = creator;
        minContribution = minimum;
    }

    function returnReqLenght() public view returns (uint) {
        return requests.length;
    }

    function contribute() public payable {

        require(msg.value >= minContribution);
        require(!approvers[msg.sender]);
        
        approvers[msg.sender] = true;
        approversCount++;
    }

    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }

    function createRequest(string memory reqDescription, uint value, address payable recipient) public onlyManager{
        Request memory newRequest = Request({
            requestDescription: reqDescription,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
    
        require(!requests[index].complete);
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);

        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeRequest(uint index) public onlyManager{
        
        require(!requests[index].complete);
        require(requests[index].approvalCount > (approversCount)/2);
        require(requests[index].value <=  address(this).balance);
        
        requests[index].recipient.transfer(requests[index].value);
        requests[index].complete = true;
    }
    
}
