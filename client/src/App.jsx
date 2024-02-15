import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'

function App() {
  const [isConnected, setIsConnected] = useState(false);


    async function connectToMetamask() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log("Metamask Connected: " + address);
          setIsConnected(true);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("Metamask is not detected in the browser");
      }
    }

  return (
    
  (<Login connectWallet = {connectToMetamask}/>)
      

  );
}

export default App
