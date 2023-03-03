import React, {useState, createContext, useEffect} from "react";

import Web3 from 'web3';


export const ContractContext = createContext();

import FlappySeals from '../contracts/FlappySealsWhiteList.json';

const flappySealsContractAddress = '0x79653BD1D8dfD611B95048B8886a4b3c46D5A345';
const flappySealsABI = FlappySeals.abi;



function ContractContextProvider(props) {

    const [user, setUser] = useState("");
    const [flappy, setFlappy] = useState({})
    const [show, setShow] = useState(false);
    const [balance , setBalance] = useState(0);  
    
    
  


    const loadWeb3 = async() => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
          }
          else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
          }
          else if (window.innerWidth > 720 && !window.web3) {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
    }

    const loadContract = () => {
      if(window.innerWidth > 720) {
        const web3 = window.web3;
        const flappy = new web3.eth.Contract(flappySealsABI, flappySealsContractAddress);
        setFlappy(flappy);
      } 
        
    }

    


    useEffect(() => {
        loadWeb3();
        loadContract();
       

    }, [])

    

    return(
         <ContractContext.Provider value={{ user, setUser, show, setShow, balance, setBalance, flappy}}>{props.children}</ContractContext.Provider>
    )
}


export default ContractContextProvider;