pragma solidity ^0.5.11;

contract CampaignStore {
    address[] public deployedCampaigns;
    
    function createCampaign(uint min) public{
        address newCampaign = address(new Campaign(min, msg.sender));
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minContribution;
    uint public approversCount;
    mapping (address => bool) public approvers;

    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creator) public{
        manager = creator;
        minContribution = minimum;
    }
    
    function contribute() public payable {
        
        require(msg.value >= minContribution);
        require(!approvers[msg.sender]);
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string memory description, uint value, address payable recipient) public onlyManager{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
    
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);
        
        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }
    
    function finalizeRequest(uint index) public onlyManager{
        
        require(requests[index].approvalCount > (approversCount)/2);
        require(!requests[index].complete);
        
        requests[index].recipient.transfer(requests[index].value);
        requests[index].complete = true;
    }
}
