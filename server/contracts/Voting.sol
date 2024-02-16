// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting {
    address owner;
    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public isVoted;

    uint public votingStart;
    uint public votingEnd;

    constructor(string[] memory _candidateNames, uint _durationInMinutes) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function canVote() public view returns (bool) {
        return isVoted[msg.sender];
    }


    function vote(uint _candidateIndex) public {
        require(!isVoted[msg.sender], "You have already voted.");
        candidates[_candidateIndex].voteCount++;
        isVoted[msg.sender] = true;
    }

    function getCandiatesInfo() public view returns (Candidate[] memory){
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp < votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
    }
        return votingEnd - block.timestamp;
    }
}
