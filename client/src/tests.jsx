import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Login from './components/Login';
import Connected from './components/Connected';
import Finished from './components/Finished';
import { contractAddress, contractAbi } from '../../server/constants/constant';

function App() {
  const [account, setAccount] = useState(null);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [voted, setVoted] = useState(false);
  const [candidates, setCandidates] = useState([]);

  getCandidatesInfo();
  getVotingStatus();

  useEffect(() => {
    // getCandidatesInfo();
    // getRemainingTime();
    // getVotingStatus();
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  });

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function getVotingStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
  }

  // async function getRemainingTime() {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send('eth_requestAccounts', []);
  //   const signer = provider.getSigner();
  //   const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
  //   const time = await contractInstance.getRemainingTime();
  //   console.log(time);
  //   setRemainingTime(parseInt(time, 16));
  // }

  async function vote(candidateIndex) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx = await contractInstance.vote(candidateIndex);
    await tx.wait();
    canVote();
  }

  async function canVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const status = await contractInstance.canVote();
    setVoted(status);
  }

  async function getCandidatesInfo() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const candidatesList = await contractInstance.getCandiatesInfo();
    const formattedCandidates = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber(),
      };
    });
    setCandidates(formattedCandidates);
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log('Metamask Connected: ' + address);
        setIsConnected(true);
      } catch (err) {
        window.alert('Error connecting to Metamask: ' + err.message);
      }
    } else {
      window.alert('Metamask is not detected in the browser');
    }
  }


  return (
    <div className="App">
      {isConnected ? (
        votingStatus ? (
          <Connected
            account={account}
            candidates={candidates}
            vote={vote}
            canVote={canVote}
            voted={voted}
          />
        ) : (
          <Finished />
        )
      ) : (
        <Login connectToMetamask={connectToMetamask} />
       )}
    </div>
  );
}

export default App;
