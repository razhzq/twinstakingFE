import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import {ContractContext} from '../../context/ContractContext';






function HeroApp() {

  const { user, twinStaking, twin, show, setShow, balance, setBalance, totalStaked} = useContext(ContractContext);

  const [poolBalance, setPoolBalance] = useState(0);
  const [poolStatus, setPoolStatus] = useState("Close");
  const [stakedAmount, setUserStakeAmount] = useState(0);
  const [reward, setReward] = useState(0);
  const [maturity, setMaturity] = useState(0);
  const [total, setTotal] = useState(0);
  
  

  const getPoolStatus = async () => {
    const status = await twinStaking.methods.getPoolStatus().call();
    if(status == 0) {
       setPoolStatus("Close");
    } else if (status == 1 ) {
      setPoolStatus("Open");
    }
  }

  const getUserStakedTWIN = async () => {
    const amount = await twinStaking.methods.getUserStakeAmount(user).call();
    const divBal = amount / (1 * 10**18);
    setUserStakeAmount(divBal);
  }

  const getRewards = async () => {
    const reward = await twinStaking.methods.checkRewardCycle(user).call();
    const divBal = reward / (1 * 10**18);
    setReward(divBal);
  }

  const twinBalance = async () => {
    const bal = await twin.methods.balanceOf(user).call();
    const divBal = bal / (1 * 10**18);
    setBalance(divBal);
  }

  const unstake = async () => {
    await twinStaking.methods.unstakeToken().send({ from: user }).on('transactionHash', (hash) => {
      console.log(hash);
    })
  }

  const claim = async () => {
    await twinStaking.methods.claimRewards().send({ from: user }).on('transactionHash', (hash) => {
      console.log(hash);
    })
  }

  const getPoolBalance = async () => {
    const bal = await twin.methods.balanceOf("0xf743541bBd7EB3366C30323bcF2B39ff005DC745").call();
    const divBal = bal / (1000000000000000000);
    setPoolBalance(Math.round(divBal));
  }

  const getMaturity = async () => {
    const bal = await twinStaking.methods.getMaturityPeriod().call();
    const days = bal / (24 * 60 * 60);
    setMaturity(days);

  }

  const getTotal = async () => {
    const bal = await twinStaking.methods.getTotalStakedinPool().call();
    const divBal = bal / (1000000000000000000);
    setTotal(Math.round(divBal));
    console.log("total: ", divBal)
  }


  


  useEffect(()=> {
    getUserStakedTWIN();
    getRewards();
    twinBalance();
    getPoolBalance();
  }, [user])

  useEffect(() => {
    getTotal();
    getMaturity();
    getPoolStatus();
  })



  return (
    <section className="px-4 md:px-16 lg:px-36">
      <div className="max-w-6xl relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-5 md:pt-40 md:pb-16 ">
          {/* Section header */}
          <div className="max-w-2xl pb-0 md:pb-16">
            <p className="mb-8 text-5xl font-black" style={{ fontFamily: 'system-ui' }} data-aos="fade-up">
              <span className="text-stroke">TWIN </span>
              TOKEN
              <span className="text-stroke"> STAKING</span>
            </p>
            
            <div className="w-full px-8 py-8 text-gray-100 border rounded-3xl bg-[#253051]">
              <div className="flex justify-between text-xs">
                <span>PRICE PER DISACART</span>
                <span>TOTAL</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>-BNB</span>
                <span>-BNB</span>
              </div>
              <hr className='w-full h-1 bg-white'/>
              <div>
                <p className='my-8 text-center text-xl font-bold'>MINT YOUR</p>
                <h1 className='mb-8 text-center text-3xl font-bold text-[#89a7e0]'>Dosacraf</h1>
                <div className="flex items-center mb-8">
                  <div className="flex justify-center items-center w-16 h-10 bg-[#89a7e0] text-white font-bold rounded-l-3xl cursor-pointer">-</div>
                  <div className="flex justify-center items-center w-full h-10 bg-white text-black font-extrabold text-xl">1</div>
                  <div className="flex justify-center items-center w-16 h-10 bg-[#89a7e0] text-white font-bold rounded-r-3xl cursor-pointer">+</div>
                </div>
              <hr className='w-full h-1 bg-white'/>
              <div className="pt-8">
                <p className='text-center text-md font-bold'>TOTAL MINTED -</p>
                <div className="flex justify-center items-center w-full h-10 my-8 bg-[#89a7e0] text-gray-300 rounded-3xl"> MINT </div>
                <p className='text-center text-md font-bold'>FREEBIES 0</p>
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