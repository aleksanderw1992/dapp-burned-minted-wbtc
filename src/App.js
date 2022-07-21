import React, {useState} from 'react';

import TransactionsList from './components/TransactionsList';
import './App.css';

const {ethers} = require("ethers");

function App() {
  // const numberOfLastTransactions = 20;
  const numberOfLastTransactions = 2;
  const [minted, setMinted] = useState([]);
  // eslint-disable-next-line
  const [burned, setBurned] = useState([]);

  function fetchTransactionsHandler() {
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
      const mintTransactions = mintTransactionsAll.slice(- numberOfLastTransactions);
      // eslint-disable-next-line
      const burnTransactions = burnTransactionsAll.slice(-numberOfLastTransactions);
      // console.log(mintTransactions);
      // console.log(burnTransactions);

      const transformedMintedTransactions = [];
      for (let i = 0; i < mintTransactions.length; i++) {
        let transactionData = mintTransactions[i];

        const block = await provider.getBlock(transactionData.blockNumber);
        const transaction = await provider.getTransaction(transactionData.transactionHash);
        // console.log(block);
        // console.log(transaction);
        transformedMintedTransactions.push({
          id: transactionData.blockNumber,
          hash: transactionData.transactionHash,
          from: transaction.from,
          time: new Date(block.timestamp * 1000).toLocaleString("en-GB", {timeZoneName: "short"}),
        });
      }
      console.log(transformedMintedTransactions);
      setMinted(transformedMintedTransactions);

    };
    console.log(result());
  }

  return (
      <React.Fragment>
        <section>
          <button onClick={fetchTransactionsHandler}>Fetch Burns & Mints
          </button>
        </section>
        <div className="row">
          <div className="column">
            <TransactionsList transactions={minted}/>
          </div>
          <div className="column">
            <TransactionsList transactions={burned}/>
          </div>
        </div>
      </React.Fragment>
  );
}

export default App;
