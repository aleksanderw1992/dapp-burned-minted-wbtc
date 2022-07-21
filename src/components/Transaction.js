import React from 'react';

import classes from './Transaction.module.css';

const Transaction = (props) => {
  return (
    <li className={classes.transaction}>
      Hash: <p><a href={"https://etherscan.io/tx/" + props.hash} target={"_blank"}  rel="noopener noreferrer">{props.hash}</a></p>
      From: <p>{props.from}</p>
      Time (en-GB): <p>{props.time}</p>
    </li>
  );
};

export default Transaction;
