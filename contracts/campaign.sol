pragma solidity ^0.4.17;

contract Campaign {
    address public manager;
    uint public minimumContrubution;
    address[] public approvers;
    
    function Campaign(uint minimum) public{
        manager = msg.sender;
        minimumContrubution = minimum;
    }
}