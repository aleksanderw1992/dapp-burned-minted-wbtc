import React from 'react';

import classes from './Transaction.module.css';

const Transaction = (props) => {
  return (
    <li className={classes.transaction}>
      <h2>{props.hash}</h2>
      <h3>{props.from}</h3>
      <p>{props.time}</p>
    </li>
  );
};

export default Transaction;
