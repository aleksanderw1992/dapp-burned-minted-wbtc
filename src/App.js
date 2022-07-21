import React, {useState} from 'react';

import TransactionsList from './components/TransactionsList';
import './App.css';

const {ethers} = require("ethers");

function App() {
  const [transactions, setTransactions] = useState([]);

  (function init() {
    const url = "https://eth-mainnet.g.alchemy.com/v2/OslwwunY4JRtMPtd3MMKCM6Bk2tFAkqV";
    const wbtcContractAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

// Using ethers.js
    const provider = new ethers.providers.JsonRpcProvider(url);
    let abi = ["event Mint(address indexed to, uint256 amount);",
      "event Burn(address indexed burner, uint256 value);"];

    const contract = new ethers.Contract(wbtcContractAddress, abi, provider);
    const result = async () => {
      const mintTransactions = await contract.queryFilter("Mint", 0, "latest");
      const burnTransactions = await contract.queryFilter("Burn", 0, "latest");
      console.log(mintTransactions);
      console.log(burnTransactions);

      const deployed = await contract.deployed();
      console.log(deployed);
      /*
      fetches mint object from blockchain:
      {
    "blockNumber": 6783061,
    "blockHash": "0xa919909b9f3cb46e0e90fb89a1fba433dfece921e2a2b39bc14116459467d2b8",
    "transactionIndex": 18,
    "removed": false,
    "address": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    "data": "0x0000000000000000000000000000000000000000000000000000000000895440",
    "topics": [
        "0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885",
        "0x000000000000000000000000fdf28bf25779ed4ca74e958d54653260af604c20"
    ],
    "transactionHash": "0xc79827e4771e66294cd1cbf38c6feba92946116831e153075abfb7180a1b3f7a",
    "logIndex": 7,
    "event": "Mint",
    "eventSignature": "Mint(address,uint256)",
    "args": [
        "0xFDF28Bf25779ED4cA74e958d54653260af604C20",
        {
            "type": "BigNumber",
            "hex": "0x895440"
        }
    ]
}
       */
    }
    console.log(result());

  })();

  function fetchTransactionsHandler() {
    fetch('https://swapi.dev/api/films/')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transformedTransactions = data.results.map((transactionData) => {
        return {
          id: transactionData.id,
          hash: transactionData.hash,
          from: transactionData.from,
          time: transactionData.time,
        };
      });
      setTransactions(transformedTransactions);
    });
  }

  return (
      <React.Fragment>
        <section>
          <button onClick={fetchTransactionsHandler}>Fetch Mints</button>
        </section>
        <section>
          <TransactionsList transactions={transactions}/>
        </section>
      </React.Fragment>
  );
}

export default App;
