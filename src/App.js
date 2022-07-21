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
      const mintTransactionsAll = await contract.queryFilter("Mint", 0, "latest");
      const burnTransactionsAll = await contract.queryFilter("Burn", 0, "latest");
      const mintTransactions = mintTransactionsAll.slice(-20);
      const burnTransactions = burnTransactionsAll.slice(-20);
      console.log(mintTransactions);
      console.log(burnTransactions);

      const transformedTransactions = mintTransactions.map((transactionData) => {
        return {
          id: transactionData.blockNumber,
          hash: transactionData.transactionHash,
          from: null,
          time: null,
        };
      });
      console.log(transformedTransactions);
      setTransactions(transformedTransactions);

    };
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
          <button onClick={fetchTransactionsHandler}>Fetch Burns & Mints</button>
        </section>
        <section>
          <TransactionsList transactions={transactions}/>
        </section>
      </React.Fragment>
  );
}

export default App;
