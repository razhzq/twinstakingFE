import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Web3 from 'web3';

import {ContractContext} from '../../context/ContractContext';

import {MerkleTree} from "merkletreejs"
import { keccak256 } from '@ethersproject/keccak256';
import {Buffer} from 'buffer';





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
    await flappy.methods.mint(amount).send({ from: user, value: Web3.utils.toWei(nftFees, "ether"), gasLimit: 5000000}).on('transactionHash', (hash) => {
      console.log(hash);
    })
  }

  const mintWhite = async (amount, nftFees, merkleProof) => {
    await flappy.methods.mintWhitelist(amount, merkleProof).send({ from: user, value: Web3.utils.toWei(nftFees, "ether"), gasLimit: 5000000}).on('transactionHash', (hash) => {
      console.log(hash);
    })
  }

  const getSupply = async () => {
     const supp = await flappy.methods.totalSupply().call();
     setSupply(supp);
  }

  const padBuffer = (addr) => {
    return Buffer.from(addr.substr(2).padStart(32 * 2, 0), "hex");
  };

  const generateProof = (user) => {
    const leaves = whitelisted.map((address) => padBuffer(address));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });

    const merkleRoot = tree.getHexRoot();

// 6. Calculating merkleProof to check if an address is whitelisted
     const merkleProof = tree.getHexProof(padBuffer(user));
     

     if(!merkleProof) {
        alert("You are not whitelisted!")
     } else {
      return merkleProof;
     }
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
                <span>PRICE PER NFT</span>
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
                <div className="flex div-plus justify-center items-center w-full h-10 my-8 font-extrabold text-white rounded-3xl cursor-pointer"
                  onClick={() => {
                    mintWhite(counter, String(counter * 0), generateProof(user));
                  }}
                > WHITELIST MINT </div>
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


const whitelisted = [
  '0x007e1b3811d5090f1eb746bd3ccc3d865552521e',
  '0x014e3dee6fdeab91f864d5bbd584d96b2ff4839e',
  '0x0216b04c8e10a76785c7a6551a608bb97191debc',
  '0x03123e010c17f1ec1167a0ffc0b7e0ea4dd20e8b',
  '0x03614d9cb82a9d02f8d5d9c13e02380ac0cfb2d3',
  '0x0370e947ba3f6923f9688e9dc4d1d7de166e83fd',
  '0x0383d46c72d0571e0169769fbe4f63b3d40a5fee',
  '0x03b01db5e497708682f5a9db523ae450536f51b4',
  '0x03b0e4a19f357a112be59d658ec4e2834d510f39',
  '0x04e1511ca4aad557315b295435ca5790bfd4bbdd',
  '0x04fe941719e27dd6cc0f58e6e780a23879118201',
  '0x055338b86eb9e5fbe99219251bfadd529eb95fb0',
  '0x05abc2efb0e8b540e68957ddb2f1aa674db2bcc7',
  '0x05e851b796378cd18ff1f5f27f270bdff309e250',
  '0x063ade6239e167209c393de5a2eaaed413dff38b',
  '0x06570ac7e7622e27fd256ccf36d79ccab06656de',
  '0x069c1da6a7a620c3d6a32483adcad5e6f6be4049',
  '0x06acd26eb5a1f0027c96195a8ddf5f40ec189df8',
  '0x06d23a3b0609dfadb02a7662763783bf43650d21',
  '0x08130f5ab5da1214f3ddcc85199720f872d12839',
  '0x08a530c9f80424113f9aeb058fb52b2e43185e1e',
  '0x091f360e0cd720ab8b95cfd1837bcdad8f2d324b',
  '0x09f31de22f1c5aa7b62b732d92d942b595d35e2d',
  '0x0a0e14e9c8166d4a6da219edc9a745d4451d8057',
  '0x0b0503872bbdc1c1eeb730fe23327171e497d187',
  '0x0dcfd73e2e4400815ad6e0e12568139892c60466',
  '0x0de5b8714001106815017add4e4936572bc8456f',
  '0x0df840f484dcbe1ace5e50026c373a8607037af7',
  '0x107e991119ea8a80e9b5e5c69828c36cbb58fc3c',
  '0x10d916887d8e07c8b69f236231c10746f859bcb4',
  '0x10dbf82a8bb191bd1c082de5ef915e998aa5ccd7',
  '0x1111111254eeb25477b68fb85ed929f73a960582',
  '0x128fb74c84336e8b0ac3c106cfba06ed460f5f71',
  '0x13f1c6aa9480f5950f5037d56c5582b6e8395624',
  '0x15f386a69eb29c2d284a655957e3b96a62fb76d9',
  '0x1607c5462b29e94db59e544ef35705faba6e7ef3',
  '0x1657c513c2cc90e4c4e49c7c60122bcbe146d727',
  '0x16ba7f8cf33fa8049c37a3a46ed39fc4b452f841',
  '0x1733a52e5b33f85e2cc5ff81f6983e785d8cce3d',
  '0x1739f7db011557f508a51788f9ac6fa780518091',
  '0x17654b970dfd10bcd0c7b789d93576a40e06f4c1',
  '0x18277669c9843156c3910549672000a5102dfebd',
  '0x18615f5506ed5b4dd378c4162d09943df687127f',
  '0x19bb8dc361c33de97faea342300d43c337f201b9',
  '0x1a36b4de48f9ce9cfb82e09e32666b4596f84660',
  '0x1b59237d0cff7b879f3a7c5045d30ba3e9518d3f',
  '0x1d0bc01616984b9bd331c107c1d3cdce415b998c',
  '0x1e06b394e073dfd285d071184d410cd391b42045',
  '0x1ebb73f5f47bcc3d7dc1dabf7284875e3ae40e07',
  '0x20df7f9eb2c0c6de39c29ce139c318fe6daff802',
  '0x215f0c5661fdcf121f29bad47ea56326d3e6f7bf',
  '0x21f8dde1e270850dba37d489c97717fc0da7bb78',
  '0x22bfe95efb8e593327d5761747f896a0eb9a89da',
  '0x232c7ed6d64decd26d28f0e8e13be2d5376c4521',
  '0x232fff8b4304609269530a8144f95971fc1e229a',
  '0x25bbd63073331bb39c4418dc5b3ae27b733637a1',
  '0x25ce95cd52cef950e9b5b2dc0a62f94ded4ba1d9',
  '0x27119bfdc8ee975c33a3ef758ef922b9ceabdb78',
  '0x27bee259a64b19dfb7633d7a1da41e9c7f24eabe',
  '0x2898e97825109a858f9005ce4809400cf7b1a907',
  '0x29ae92b2be13e902ab4434c790bab1f59be1bbb9',
  '0x2ac678296a9ce6c26c8a573fdbdf4ec12579ef0e',
  '0x2b59fdffe8ae11e72e417f924573f540847bf131',
  '0x2c32341c24492e5e97a6a346d03f1cb5d1ac100d',
  '0x2c749982e9158d7586c0ba858f1f321a3dc0236b',
  '0x2d41e5b5f65d1f369c5a6718a4d919e97459a59d',
  '0x2d7fe42140d3756db4cfc9441ff7381443f1ebb8',
  '0x2e6d89db2e8349ddb200f1c13fb0d3cedb8df08f',
  '0x2f5bf48294a40657c3e0b61527141ccbb0db5f98',
  '0x2f63bf2077dd8fa048780f9c74b49d5703b493b9',
  '0x2f7c8513b5a94a630fcd9bf5effe62a189e66a61',
  '0x2fea269539347870853724b1ce64781df3bbe892',
  '0x3058a0d5e8e1a7b15dbf13eb3d411ee3efea70d9',
  '0x3096b9129e7b865f15b3ea8cd2b39d2ac032bfd2',
  '0x3112ee6f274fa62d27aaa5cccc9ca260c7da3dc1',
  '0x31658df07a63634fd15ea2ab8ca6a739cecc0a55',
  '0x3169102f672736a0a30ddeabfb8f4ea9a368ed1b',
  '0x316b4e1f6150f7fc8f665c03f3b09818d15cf027',
  '0x31d1c2462b080dc5407a67535f0f51c080210e35',
  '0x3213886983eec823a78fb194dbd4fac92b4e5741',
  '0x32cd81a32f13ca5a416a87daa09d2ce7a09c9e19',
  '0x333f3598180924e2eb9b841021a9fda65caf82f5',
  '0x33dd9aa9a416081d6bfbee4df8dd8a1e65d4a1f2',
  '0x3518c9dde00f0e9b560480a300a48e97e4d72d1d',
  '0x352efd95031872b60409e71e29294a6f58872893',
  '0x3588ab6c2d1a8a87287bf03af7942da15a0c0a4a',
  '0x365b1c28e2f6c48acb0cfa10bca5b3a2706412ed',
  '0x3826d014598dbc0d27d608f92648ba203dc87150',
  '0x38805751b453fb6519635aff9b3870447475bcb5',
  '0x3882887040468381edb1d356f93e1db0ab13f720',
  '0x39ea2bdb4435199cee75d0a111472d9cdce92e38',
  '0x3a07773a0cf4a5a315c24b4eb61d0d3e8a3197e6',
  '0x3ac0109ac8cdf619b7718c8d530d5b622cf72d78',
  '0x3af8cd707e7fe2c38d112f83438c205da33e81f2',
  '0x3c19553ed52438376a1fe89b87d1a621477f0bf9',
  '0x3ca9f6dd0ce635b91d027b229cf660c788bd0912',
  '0x3cd63144b15845eb08764939a9a707642d4d2ab0',
  '0x3d69a4ec30f3430c25c80630c3656b0c7d4447fc',
  '0x3d6a2b623f2bd70d715224156a65453464ea3527',
  '0x3db7a965973d327d1a7a3e4abe942a5708fd609d',
  '0x3f4ce394d68c64d17c2a0aac560b274a775d8a1d',
  '0x3fa6ca0af83d9c4d06d89888de6377f6b40d51cc',
  '0x4098fa01aa5bb6463e023eb5e96c42d57e844072',
  '0x41b8708151d6e936122e55f6325740e6a8f9a391',
  '0x431e8ca88b2dc364614dfabe1eca999548a6a52f',
  '0x4323e434337419944f15788baa5078adb7ec5daf',
  '0x4327d50d4e04644b2c7c76fb50a92aeca9bd5874',
  '0x43a0217cc5cfd938525d0b56ee6ccb1bf714f526',
  '0x44861be88b31f08ad0f5734d4890ea010113cc61',
  '0x4498aa1a1caf7af5b93452af8acb813593553f08',
  '0x449e1f27af28b603bdcf3d13d46d68090723536b',
  '0x44c25b6a0a69829e2d26314c064754eba6c13f65',
  '0x451c1544f3c7cedcae95d82947548a338b7974a5',
  '0x4573c708724ff7c1e21577f022ad1ab23acfc31a',
  '0x45dcb8346be275f0c28193a47c545b35d68c67da',
  '0x4755655da2207dc37781ec61a34fb771750c7511',
  '0x48585a9ad639ea9b92ecc3a9d2f07d4518c323b7',
  '0x49074bafcb5036fd9904d0acfdd54885caffe699',
  '0x4917b5bf3130401a4f92992f6aaedb750768cba1',
  '0x49e45ea40995363fed3d6cbb69fb5b94e4f7bab1',
  '0x4afe52b06be1f7bf3a1e0430d56c3a845b9d2001',
  '0x4b0ccb6e8c765c3ac779e298a15b40e3bd6a35d4',
  '0x4bf419634bbcfbba096f780cff10858ac2cb6dda',
  '0x4cc1aee2578e155dcc30961f4a3e626ce2514366',
  '0x4e2cc19317d23680aafe52189491d12f890c3c02',
  '0x4e2d5295873605a82de11853024cc1655030afd3',
  '0x4eebde0c033468c00ece5ede6fb2a2e2d65ba2f8',
  '0x4f2e69787ca690ca912656782203662c637e3b43',
  '0x517fa5a06ac1588be7bfb305a2847dd5bdee8f69',
  '0x53b66c4c61a1a2c6d0d15a287c27c03745208ebc',
  '0x5475c09f1c46ff053687752d30734463a228a966',
  '0x5588fe9e61e72d4d55f7531d1c2ef7dc9cc0ea59',
  '0x57f1e0a0e447dd9a915ecddeb341a882ebd2d85b',
  '0x58178db85ecaf73201c320134d4bc73ed52aa6d9',
  '0x585ff2a99a6c459d7209c065e4906b5d525bcee0',
  '0x591901031198e8574fde7a42bb0a909a7a3c09fa',
  '0x5943278f98d387757dd58793d46eb7948d746ef0',
  '0x59acebe60be440bcd22509021c64f59ac785baf9',
  '0x59d2e0a2be0db463c36038a5fd2535f58ab3b38f',
  '0x59e1467462b2aa82d6bf398c2e84e25eb66452a5',
  '0x5ac14cb24dce00a816579d2e313e83edf8a458ca',
  '0x5c44798e7cef28273633e6fe9777fbca71f5eacd',
  '0x5d4a629bcc6c6b936c25f9b8d05e1b1efae8a32b',
  '0x5d6a1d5946595f6f0dca5f77721c78604302a301',
  '0x5da073fcf0b04b624533f32f62eefd953d536ae2',
  '0x5e28d4b1497b44a41520a9651f62727a2e0788bc',
  '0x5f1e726e18e7f643be5f88ac085c5baae7593fed',
  '0x613604ae151ebb91830470302f74803c0f227325',
  '0x621f2a5ef987e064e76da1eb378e7193cefc0baa',
  '0x637846eb89fd6f8398c2aa5cba0bbedff76f60af',
  '0x64e8a6352ea68f13fdefd81ab910a3cfadd063af',
  '0x65d6a091dc33a66eefde54a6d86cf5e4b5832935',
  '0x66353a7d9afcd36175953e6eca32b54475d981f7',
  '0x6635624fc4443137f76dc7c7892931aa260973ac',
  '0x66e575099e4f774da2d3d03152f604a9622f2026',
  '0x67124d64de8f0d4d209d66ce33776f4f806f6266',
  '0x6747246c6ec17cbf04d39fc5aa9194bae73e753c',
  '0x679f4a92100b65a97ee5f3cae7dbba42dbacb7d5',
  '0x67c925212611e823a7752c388b9fb7c9e15f76b3',
  '0x6802cd80433b9f34d6e836de292c682f6bf08514',
  '0x6925fd3479bd83e62f025176a626a72ba2839edb',
  '0x69d142a05c0d5e961db27fe0f9665b4e5081d7fd',
  '0x69d58190e563aade01bc8e1b19dfeaafa878687b',
  '0x69e5d71a4a1292984ddb5ad7206523ef521e0f19',
  '0x6c552b47afb47f7d0c6af1dac9a479046102ed11',
  '0x6cf51fdef74d02296017a1129086ee9c3477dc01',
  '0x6da812a8004f7ad29ca1890c80e738e8ef69229c',
  '0x6df32e84c09331a6704cb536e0df35a2294aecb8',
  '0x6ecba7527448bb56caba8ca7768d271deaea72a9',
  '0x6f484e203f4e5c4849b7561c07a045c6b37c0d05',
  '0x6f72a0e6c372fd5d7351bbc90be995f644733fab',
  '0x6f8e12c9e0743af557f7b740c4df6e95af455522',
  '0x722e895a12d2a11be99ed69dbc1fedbb9f3cd8fe',
  '0x724008bd0c49f7ffe5edfbe2b1c3b35a8ee1d4be',
  '0x724fe917298ee1689ccb1738478ded5d64829f27',
  '0x7284ee58ebae4680dbaf47bb5ebd43f3d810026d',
  '0x729237adc797c951a2859c92423c7740d685502a',
  '0x72b3f143a7cb65c6c94c280fe08f062a40dc8248',
  '0x72bba6cf7fbe2a0ac346a6c79bc8b5486bdb7252',
  '0x72d5b30772fc08c0c8404c42b8d6742ca04417c7',
  '0x742c9151d708a48660effd6b5560ca7df0f1affc',
  '0x74b390e39e355c525542c8c020461eff5599f042',
  '0x74e544e0017eb3fcdacd81257cb609761833a0ca',
  '0x74f15271c96871e3b26f02ab60c164a26567cab1',
  '0x751549915bfa29ebd5b1e0490f0bc7a7e6bcb7ea',
  '0x755a7ca547f8145cea91b332c5264a0128493959',
  '0x7771bf25d7b91f5dc048096f7a583c09eed51fd7',
  '0x777336ae2cef9ddc261a61a97cbfb4e0aa7d1329',
  '0x784fb26eee4c5d4e5738e773d02c90c32f071c25',
  '0x7911670881a81f8410d06053d7b3c237ce77b9b4',
  '0x798496d1d09174579872f60d366eb498f467a7f3',
  '0x7d4e2d1cebc4534d81f6f7c20920c8db729848ca',
  '0x7e51a94d999666b94c457dd1e79632d5887c653e',
  '0x7e528b571c78832db13c12bff73c2a15df709334',
  '0x7ef506214e327e41060b3f01d0ffb90288372ce7',
  '0x7f0a14134a067f068aff6fce637a11d14d2bbbd1',
  '0x80326b305ba96e2758d98a7e04ec5b8d0eb43b8e',
  '0x80f34b11b1fd6d3ea5cf11fe03e1775f220f1ec1',
  '0x810bf1c0167cb409f5929ac7990b6165696009d2',
  '0x81216a0669b5708d55a222ca64d1b9577279382c',
  '0x826e41798099aaa19f7979c33ed8ddf5c3709365',
  '0x82cb5692125fab769912dc3e60a5cb31eab273f4',
  '0x832230d9e38d4048cbf7fd275a9146aea6faee21',
  '0x842263ccbbfdba5313680b9e4f521ce812e63c97',
  '0x848430ced8217931c8896e80c37f43d5421ef9ad',
  '0x848f2360eb29634ff90c4c9512bd4aec23437065',
  '0x84b28e08e8ee9563b443beaf5a7ada0e3ef59192',
  '0x84f3d8550fbcd6e64fe43213724100d1163a4bcf',
  '0x85270caa309690d27a92531a5d898cb9be1c2379',
  '0x85e5dd798278f1da98509e8a5e9a21d53276ae54',
  '0x868632127bead1181235238f6e9fb7741b439c99',
  '0x87bc301b20dcbe9965a208bf0bebc3759644ce45',
  '0x87fbfaf1f5db7c2c5208b5516c9d3ceb09afce07',
  '0x87fd68997521759f1045638fd37dfd7d9eb13f06',
  '0x88c90f07a4916b8992040e524523a3c76744c3eb',
  '0x88df58d97e818904ae51f7f99831963f2eb3c41b',
  '0x890382e7de5ab7a47e6644d047367a3c967eb663',
  '0x891a144965c72c50201bf06f851d3a25d1d07946',
  '0x8acf2f327e47fddd1124a55eb4efc1dfdacaa34c',
  '0x8ad06190e9a3f5013a2dd5e0f259351833f2866e',
  '0x8da0bac07785ef6981942a9ea7356e63c56faf8b',
  '0x8dcd1915b829210e59f1fe8193027f6a788a0143',
  '0x8e7437f419717782dd491539803f23369bc48460',
  '0x8e843c4ae82bcd796e9057b361b209afe1fb97ca',
  '0x8ee68082b79ca290fbe00780b38b50716b34da11',
  '0x8fd5b58f6fd8c4d961ebca9b0ef7aae6dedd740c',
  '0x91db53360333a8282ed03c47086029bc50ef18da',
  '0x91dd56ea6d0885a78ba9ab99af780803dd54ca45',
  '0x936f446262b3da03dcccb3f979971d8c61e18f06',
  '0x93af96a6dfb8c15a3489855a5acec87418036f69',
  '0x93e4974374a8663e0f3d477497008910a3b12a87',
  '0x93f5af632ce523286e033f0510e9b3c9710f4489',
  '0x94720b6ea8b6b3da826f8968cd4f0260190bc82a',
  '0x95e1aa85b73202e8f511cf1aca6414aaf3abfbeb',
  '0x97081b617979aad9df3230c80967fec64eaf5704',
  '0x9727a02eb45fbd80888adfe5dd877947e0b56e36',
  '0x97337b4d184d927309e47546a6c5718b630ce678',
  '0x9761393fb40d27b4e5ce0b56654703ce321933ec',
  '0x977dd3a312ee0f3b3bf2a4339d0f26ec5f6875b5',
  '0x97e694baa2ce21590bda8bfb7329efabcdcb8442',
  '0x982b564c6b98f89cfa24ec072c15d9d587401f26',
  '0x9919ca7859700de82c92411a6afe6d46abb99af1',
  '0x99328b165f0525bb26a95c98c414191b16e562d8',
  '0x9a8e31771c7191ee912b39f45e3435ff628f5e66',
  '0x9a96297e06c5d36982433b57132d409228c391ca',
  '0x9b84836374209bae30575a33afe45ea30c313a18',
  '0x9dcff4691f1147c0d4cc80886d1be7d3e2f11268',
  '0x9ec557d6edded6e1d07516f1533d4345cc957c14',
  '0x9ee508325f4b70070b7b1feee2ff9b1a3aa61add',
  '0x9fff4c0f436ea61e0055f5cd2ca332247570af01',
  '0xa01cadbdb5ffc17f9b6a9d11b5cb6af40979fe71',
  '0xa02a33183519556e1be8d6a5f9936bc4c25d62db',
  '0xa0446d8804611944f1b527ecd37d7dcbe442caba',
  '0xa0eace11887c4264fa6c76d2d815bf15aca667c3',
  '0xa1f6a285ef0c9b61508bdec00c10b45e2c890dad',
  '0xa2ae90f5980ec0a2a257ab2dd955f394207d4ecf',
  '0xa2e9e0955252655fc98cf730e5ed5777d56e2891',
  '0xa3e2f84fc715b48ed9a6db19d9dc409162ec5a9d',
  '0xa4be81d87aaa36f995adcce282b43efb5236b61a',
  '0xa537f9c2250f5bdb6c4394d4dbec361273ee40e0',
  '0xa53dacc908fd6e12cff8550c1d2949268bc0aa29',
  '0xa554849ebb0e2bbb668f69541d58bd42ddbc86cc',
  '0xa55ad720f75cfd9f5f6f9b8c2fc51ea383671421',
  '0xa5c00bcfa2b37660db0a0d88b9db2cb174d6d8cf',
  '0xa6b26516aec581bf4d2e0b52ead8983a98e3f156',
  '0xa71de7e1b7ed086b4ede0be541e7076c51244541',
  '0xa76ef4a743b5131ea99fa6cbb963a11c50336357',
  '0xa7d6e4ef8f81c0bbc52a2c525c3dac3d21d56da5',
  '0xa9eeed0bc57a56bad2e2c6880659494871c1305a',
  '0xab5f6b2b24b5e7b8ee5218d534f0ff8cffd88d5c',
  '0xabf89da69b86d261755a2629967ef71da53b20d2',
  '0xac734d1e401a12c4fb2eb5814f8831aea385dc67',
  '0xaca61495e0547826c5d35432361d72062e7ad99f',
  '0xad0be00e8d28ffbb7c190644476006f4d14c0550',
  '0xad38ae28aa9e9d3dc6aca67689cdcaedec552891',
  '0xaddff81c9b0b9c3a918d215eb3bbdae80676528c',
  '0xb0159a82a4b3e6082bc289fb446bad6926c5c1d7',
  '0xb0195c2b8d826da9d1282cd4ca48cbf8da5a36e6',
  '0xb10cf9579241998af106e158e52ec3c43c237bc7',
  '0xb1d248e9550ac090c9eb25098e27037b118a1de0',
  '0xb23eb0e1b93551e1c652351cddac51c3ceae3e28',
  '0xb36f1cd4ad753bc4034ef24f45b97606041f7066',
  '0xb37cc84097e9a250be74da9ce014ae6d4654a69f',
  '0xb45b9d8c4ce417806921161512c4ef9008633fae',
  '0xb48196e2c8cda461817bac91bd282dc75b871276',
  '0xb4bc012e4b630db2fce840d0f1149d691e68efd9',
  '0xb568b19d3ac29b0f2e6d77cb460803f909abee83',
  '0xb5979446d7d015211470f00d5ef7d14b05105da4',
  '0xb622f010b7593f267fec1dbe7a09a02f977ffe5e',
  '0xb76ebe29d5f6ce3ecd9170353be4221dee1a9db2',
  '0xb7e6eebc5d20c32d1e97e0ca748e48e59d8010c6',
  '0xb8771475b8cf19b2d83d18c36155b944794a5582',
  '0xb8d0efdbb68b0b3957c064dee810127987d1d32a',
  '0xb94eb9d64d0e4b1a2dd79bec34660864111f1736',
  '0xb97aab9ab1bc5192ed71a559015bcdc583292831',
  '0xb9e29984fe50602e7a619662ebed4f90d93824c7',
  '0xbb5269ac475625e5ebfa933721f691485b5798a5',
  '0xbc35d102f498b6acda7cec5168fb4b19d9255953',
  '0xbebe18d02b47eae7cd31c6d4f6d82353fa69f431',
  '0xbf2d4b2443e999fb436d2f88df889f674cdf789f',
  '0xbfb746d63c15a7288be0326c63c5a49a80839f4d',
  '0xc0a324f654de5c3ed2b88871a3947b417f376742',
  '0xc16f48ce7c684c9f9801c536a9adaec82d22ffec',
  '0xc1efdac6da32b5746028f1b2755586be75c013d3',
  '0xc202c65c9b0a22bbb5df7cb26fead19244bdca3d',
  '0xc30cf256dfc731193a4fe2b02c89bf1815ec70a5',
  '0xc56429896ba1cc2f6a54866f0ef55f4d6122b901',
  '0xc5dc04e9cf4b60a170c2d39e8efc22546993b805',
  '0xc62cbee712c5602ff63d85d20b7bad6746023216',
  '0xc62e6b3645df6fa25389a752ee8511205f969a0d',
  '0xc6b094623aeef377974ad372b7a5d42a0faea524',
  '0xc784c70cddbfe35e0fdbe2f67c028aa4ae9a6a98',
  '0xc7a474cb423191e2812a4574c3a0fc73e9a99954',
  '0xc8f81b0cb9d19a7f04e28b0a6e05ce529382eaa3',
  '0xc904a3c1c02ff6f130242d7ef50591cf61f07c64',
  '0xc94298dbb10168ec9f5820ca6b7c94ce970af958',
  '0xca992110b6688b8ec90177fa523cbc2fd8d94029',
  '0xcb520629524d6b5319a76a632ed042277be9556b',
  '0xcbb2d45f51d3181dd459fe13bda2d13408beaaf8',
  '0xcc33f99b117073942f0131b58878ae1be873bc08',
  '0xcc79124f3b4683c612154aed66f17a76c9e91fbd',
  '0xcd4a476b5c4714326d71e2d8e8c69c3b936b479c',
  '0xcf65b56f39a969e17330ae5773924c47646cbfaf',
  '0xd01919ec7c2eaf4c2bb99f5aadb90c552b8bb525',
  '0xd054602d90f07f5f9779bb3cf53e8f687164e0ef',
  '0xd2ca73589bd2637827a8d16cc94860ba21de4fc0',
  '0xd3489ef3727b11f753d90296074a6e99c4cd8f64',
  '0xd3e72fa123d4910ef59e233bf271b9889f3cd29b',
  '0xd3fb8a96b51b50c03e6c71e679fee092911da6d3',
  '0xd4e1f29b74dd55a78a5c412749e5d71a02c87186',
  '0xd5cef7490bfa27dfe211519977a03470facfb64a',
  '0xd71576f75d430ada547d50858d6eb3edb01b0427',
  '0xd796383a7c03a00fc893a47a3917f367af8a3777',
  '0xd7a26a47fbe9bdb316885f518333e143a0e8b070',
  '0xd9c45915a2beb2632e9f2caba2a3adc47ea057ec',
  '0xd9fdea328390398c62f5e8b78417230c3f13e765',
  '0xda197e1fa71f17d5e254636765d09c73288156f6',
  '0xdaf243495ba9d65cb36c48d9ab639cdd3b6176ec',
  '0xdcc3c3eefa8594d4f1533466c9ed114744a67a29',
  '0xdd09ed26279f22dee238d2737fef22b6873b7c1c',
  '0xdede7b60ed45e3695faf59cca2455bafe64c964d',
  '0xe0f4a7fc22b605480545f2f24e88a9d801b67fd6',
  '0xe11373bfd916eda5f1d0a893ae4d6f3feee3478e',
  '0xe2482ac30c7b63fb04f8dcd04615eadbaabbbfbd',
  '0xe29f21f462576bb4566f1920eada02a45693c7ea',
  '0xe2ec80ae3e26e396864d478c865794f997090ee9',
  '0xe33eec26049f3b1b2d6697f8870e88da33397704',
  '0xe3b5490b3df86a928309258b7959de984a471bdd',
  '0xe3f4309fd40a1142ae3f8b80f40ef85786b829eb',
  '0xe467d054f0976a6a3cf5c7c2c558761aefc15b52',
  '0xe4724e674ae2f6f3341dcf13344a3921786a86e0',
  '0xe6fdfa49e3f004183783b5c84e20d2276ca819f0',
  '0xe791616892c4c5be5cf35a6245b7550edc6f5c3b',
  '0xe8b87458433bf4edc560e57e30eda9a0d0f280d3',
  '0xe94e8e0ead5dcad6b378594fd929792de5d8f11a',
  '0xe95b0a6928ce01d09e5da0cd2e76c38b75f201d8',
  '0xe9670308b45fd82a7313844cfaa6d814d474999b',
  '0xeae594d27e93a2d03f1d4c2ace6052e147df0941',
  '0xebdf47a18f858c8200a489757a896b0dcca2873c',
  '0xec50232db20600607cbe79f6ceaa54f0ea50a188',
  '0xeca52e827fdb5b1eecd62c73cec355c184ff3ef7',
  '0xed533dee6892349b3857adc4ea9620552f462128',
  '0xed68d1075cbc2f82fc9937e6daa15e96886df199',
  '0xed8659fb45e96a27947d7ab3150a60372af76a8c',
  '0xed889826c46b30ffb66e15ff6a0b796acf85316b',
  '0xef3e8a571d6e4735f0e6a9e7e1211e45e5f8045f',
  '0xf0062e4dc4d08dd37e358b9699393d6811d2b76f',
  '0xf0cba35d7ecb2c5f4c0db0e6a2211e28eb814e34',
  '0xf1a82301a96a84277ad6ba621de3acda46528e94',
  '0xf1a8238497c189fdd723308f13b5bc5689ef5e57',
  '0xf3d756a3431182ee75e9e41652e21da76f2d97e0',
  '0xf47be95c7f1d334110925c91d7ffba7c6c50e7fc',
  '0xf47d542a0c17e402c4e45b7852276dc2e6c766b1',
  '0xf4890b1acc336d523b58652061d726c6b0fe7c3b',
  '0xf657457865775c049364c35c460d76a093e3aefe',
  '0xf6a49babc668d0d8a27942f70b16617cf2536dfe',
  '0xf7197f33ded320f9169055f485b564b1b0c8a7f9',
  '0xf743541bbd7eb3366c30323bcf2b39ff005dc745',
  '0xf7bdb160ba50f78b88b1ed29e6e7678f28b4e375',
  '0xf8988f7692d373cd0f901272a23e3aaf33ed85ed',
  '0xf9b1c38b1b7b17601da84c59c69202ed9ace25f0',
  '0xf9d69b9eca4660b20e600e89694a3435e789c845',
  '0xf9f80d4c0aba7a459c9618e71ab70e3f9ef708ef',
  '0xfa3cafb3026e4c8f5ca2b9feee68f80eccd3bb0d',
  '0xfbda276bf935707cacfec55815739b0f1ec89b47',
  '0xfc2e9174012740cea8f377e8c30fe96d82781baf',
  '0xfc45c2a34898c1970de3f2fd424cad51cd9f2403',
  '0xfd1e0e616bf9831dc56bd175b246c7661f52338f',
  '0x6E7aD7BC0Bf749c87F59E8995c158cDa08b7E657',
  '0x34d5Be61BE8a8964e52cF2b27845Ec483AeD0Ac9',
  '0x0E10c9786D75dE07F475B15A1014b0513CdACf12',
]