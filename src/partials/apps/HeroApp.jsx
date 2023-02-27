import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Web3 from 'web3';

import {ContractContext} from '../../context/ContractContext';






function HeroApp() {

  const { user, flappy, show, setShow, balance, setBalance, totalStaked} = useContext(ContractContext);

  const [counter, setCounter] = useState(0);
  const [supply, setSupply] = useState(0);


  const increment = (e) => {
    e.preventDefault();
    if (counter < 3) {
      setCounter(count => count + 1)
    } else {
      alert('Max NFT allowed to mint reached!')
    }
   
  }
 
  const decrement = (e) => {
    e.preventDefault();
    if(counter > 0) {
      setCounter(count => count - 1);
    }
    
  }

  const mintNFT = async (amount, nftFees) => {
    await flappy.methods.mint(amount).send({ from: user, value: Web3.utils.toWei(nftFees, "ether")}).on('transactionHash', (hash) => {
      console.log(hash);
    })
  }

  const getSupply = async () => {
     const supp = await flappy.methods.totalSupply().call();
     setSupply(supp);
  }
  


  useEffect(()=> {
   
  }, [user])

  useEffect(() => {
    getSupply();
  })



  return (
    <section className="px-4 md:px-16 lg:px-36">
      <div className="max-w-6xl relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-5 md:pt-40 md:pb-16 ">
          {/* Section header */}
          <div className="max-w-2xl pb-0 md:pb-16">
            <p className="mb-8 text-5xl font-black" style={{ fontFamily: 'system-ui' }} data-aos="fade-up">
              {/* <span className="text-stroke">TWIN </span>
              NFT
              <span className="text-stroke"> MINT</span> */}
            </p>
            
            <div className="w-full px-8 py-8 text-gray-900 border rounded-3xl bg-gray-100">
              <div className="flex justify-between text-xs">
                <span>PRICE PER TWIN</span>
                <span>TOTAL</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>0.015 ETH</span>
                <span>{counter * 0.015}{" "}ETH</span>
              </div>
              <hr className='w-full h-1 bg-white'/>
              <div>
                <p className='my-8 text-center text-xl font-bold'>MINT YOUR</p>
                <h1 className='mb-8 text-center text-3xl font-bold text-gray-900'>Flappy Seals</h1>
                <div className="flex items-center mb-8">
                  <div className="flex div-plus justify-center items-center w-16 h-10 bg-[#89a7e0] text-white font-bold rounded-l-3xl cursor-pointer"
                    onClick={(e) => decrement(e)}
                  >-</div>
                  <div className="flex justify-center items-center w-full h-10 bg-white text-black font-extrabold text-xl">{counter}</div>
                  <div className="flex div-plus justify-center items-center w-16 h-10 bg-[#89a7e0] text-white font-bold rounded-r-3xl cursor-pointer"
                    onClick={(e) => increment(e)}
                  >+</div>
                </div>
              <hr className='w-full h-1 bg-white'/>
              <div className="pt-8">
                <p className='text-center text-md font-bold'>TOTAL MINTED - {supply}</p>
                <div className="flex div-plus justify-center items-center w-full h-10 my-8 font-extrabold text-white rounded-3xl cursor-pointer"
                  onClick={() => {
                    mintNFT(counter, String(counter * 0.015));
                  }}
                > MINT </div>
                {/* <p className='text-center text-md font-bold'>FREEBIES 0</p> */}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}

export default HeroApp;

const STAKING_LIST = [
  {
    title: 'APY',
    value: '50%'
  },
  // {
  //   title: 'Maturity',
  //   value: '7 days'
  // },
  // {
  //   title: 'TVL',
  //   value: '$NaN'
  // },
  // {
  //   title: 'Pool status',
  //   value: 'Open'
  // },
  // {
  //   title: 'Your Stake',
  //   value: '0 LP'
  // },
  // {
  //   title: 'dART accumulated rewards',
  //   value: '0.00 dART'
  // },
  // {
  //   title: 'dART claimable rewards',
  //   value: '0 dART'
  // },
  // {
  //   title: 'Remaining Until Maturity',
  //   value: '0 days'
  // }
]