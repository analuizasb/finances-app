import React from 'react';
import Transaction from './Transaction';

export default function Transactions({
  transactionList,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const handleDelete = (id) => {
    onDeleteTransaction(id);
  };
  const handleEdit = (id) => {
    onEditTransaction(id);
  };

  return (
    <div>
      {transactionList
        .sort((a, b) => a.day - b.day)
        .map((transaction) => {
          return (
            <Transaction
              key={transaction._id}
              id={transaction._id}
              info={transaction}
              onDelete={handleDelete}
              onEdit={handleEdit}
            ></Transaction>
          );
        })}
    </div>
  );
}
