import React from 'react';
import css from './summary.module.css';

export default function Summary({ transactionList }) {
  const count = transactionList.length;
  const positiveBalance = transactionList
    .filter((transaction) => transaction.type === '+')
    .reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  const ngativeBalance = transactionList
    .filter((transaction) => transaction.type === '-')
    .reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

  return (
    <div className={`card ${css.summary}`}>
      <span>{`Lançamentos:  ${count} `}</span>
      <span>{`Receitas:  R$ ${positiveBalance}`}</span>
      <span>{`Despesas:  R$ ${ngativeBalance}`}</span>
      <span>{`Saldo:  R$ ${positiveBalance - ngativeBalance}`}</span>
    </div>
  );
}
