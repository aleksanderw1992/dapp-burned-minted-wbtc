import React from 'react';

import Transaction from './Transaction';
import classes from './TransactionsList.module.css';

const TransactionList = (props) => {
  return (
    <ul className={classes['transactions-list']}>
      <li className={classes.title} key={props.title}>{props.title}</li>
      {props.transactions.map((transaction) => (
        <Transaction
          id={transaction.id}
          hash={transaction.hash}
          from={transaction.from}
          time={transaction.time}
        />
      ))}
    </ul>
  );
};

export default TransactionList;
