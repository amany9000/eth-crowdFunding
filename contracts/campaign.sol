pragma solidity ^0.4.17;

contract Campaign {
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
    }
    
    Request[] public requests;
    address public manager;
    uint public minContribution;
    address[] public approvers;

    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum) public{
        manager = msg.sender;
        minContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value >= minContribution);
        approvers.push(msg.sender);
    }
    
    function createRequest(string description, uint value, address recipient) public onlyManager{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });
        
        requests.push(newRequest);
    }
}