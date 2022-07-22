import React, {useState} from 'react';

import TransactionsList from './components/TransactionsList';
import './App.css';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';

const {ethers} = require("ethers");

function App() {
  // const numberOfLastTransactions = 20;
  const numberOfLastTransactions = 2;
  const [minted, setMinted] = useState([]);
  const [burned, setBurned] = useState([]);

  const { promiseInProgress } = usePromiseTracker(null);


  function fetchTransactionsHandler() {
    const url = "https://eth-mainnet.g.alchemy.com/v2/OslwwunY4JRtMPtd3MMKCM6Bk2tFAkqV";
    const wbtcContractAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

    // Using ethers.js
    const provider = new ethers.providers.JsonRpcProvider(url);
    let abi = ["event Mint(address indexed to, uint256 amount);",
      "event Burn(address indexed burner, uint256 value);"];

    const contract = new ethers.Contract(wbtcContractAddress, abi, provider);
    const performFetch = async () => {
      const mintTransactionsAll = await contract.queryFilter("Mint", 0, "latest");
      const burnTransactionsAll = await contract.queryFilter("Burn", 0, "latest");
      const mintTransactions = mintTransactionsAll.slice(- numberOfLastTransactions);
      const burnTransactions = burnTransactionsAll.slice(-numberOfLastTransactions);
      const transformedMintedTransactions = await transformTransactions(mintTransactions, provider);
      setMinted(transformedMintedTransactions);
      const transformedBurnedTransactions = await transformTransactions(burnTransactions, provider);
      setBurned(transformedBurnedTransactions);

    };
    trackPromise(performFetch());
  }

  async function transformTransactions(transactions, provider) {
    const transformedTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      let transactionData = transactions[i];

      const block = await provider.getBlock(transactionData.blockNumber);
      const transaction = await provider.getTransaction(transactionData.transactionHash);
      transformedTransactions.push({
        id: transactionData.blockNumber,
        hash: transactionData.transactionHash,
        from: transaction.from,
        time: new Date(block.timestamp * 1000).toLocaleString("en-GB", {timeZoneName: "short"}),
      });
    }
    return transformedTransactions;
  }

  return (
      <React.Fragment>
        <section>
          <button onClick={fetchTransactionsHandler}>Fetch wBTC Burns & Mints
          </button>
        </section>
        <div className={`row ${promiseInProgress ? "hide" : ""}`}>
          <div className="column">
            <TransactionsList transactions={minted} title={"minted"}/>
          </div>
          <div className="column">
            <TransactionsList transactions={burned}  title={"burned"}/>
          </div>
        </div>
      </React.Fragment>
  );
}

export default App;
