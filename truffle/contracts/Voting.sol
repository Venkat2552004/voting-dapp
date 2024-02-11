// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    address public admin;

    struct Candidate{
        uint id;
        string name;
        uint voteCount;
        address candidateAddress;
    }

    struct Voter{
        bool authorized;
        address voterAddress;
        string name;
        bool voted;
        uint vote;
        
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;

    uint public candidatesCount;

    constructor(){
        admin = msg.sender;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin, "Only admin can add Voter/Candidate");
        _;
    }

    function addCandidate(address _candidateAddress) public onlyAdmin{
        require(voters[_candidateAddress].authorized == true, "Must register as a Voter first");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, voters[_candidateAddress].name, 0, _candidateAddress);
    }

    function addVoter(address _voterAddress, string memory _name) public onlyAdmin{
        require(voters[_voterAddress].authorized == false, "Voter already registered");
        voters[_voterAddress] = Voter(true, _voterAddress, _name, false, 0);
    }

}