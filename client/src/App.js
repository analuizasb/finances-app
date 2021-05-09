import React, { useState, useEffect } from 'react';
import PeriodFilter from './components/PeriodFilter';
import Summary from './components/Summary';
import api from './api/api.js';
import Transactions from './components/Transactions';
import DescriptionFilter from './components/DescriptionFilter';
import ModalTransaction from './components/ModalTransaction';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateFilter, setDateFilter] = useState('2019-01');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  //  const [allPeriods, setAllPeriods] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const allItems = await api.getTransactions(dateFilter);
      setAllTransactions(allItems);
      setFilteredTransactions(allItems);
    };
    getAll();
  }, [dateFilter]);

  const handleDateChange = (dateDescription) => {
    setDateFilter(dateDescription);
  };

  const handleFilterChange = (filterText) => {
    setDescriptionFilter(filterText);
    setFilteredTransactions(
      allTransactions.filter((transaction) =>
        transaction.description.includes(descriptionFilter)
      )
    );
  };
  const handleNewTransactionClick = () => {
    setSelectedTransaction({});
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    api.deleteTransaction(id);
    const newTransactions = filteredTransactions.filter(
      (transaction) => transaction._id !== id
    );
    setFilteredTransactions(newTransactions);
  };

  const handleEditTransaction = (id) => {
    const transaction = allTransactions.find(
      (transaction) => transaction._id === id
    );
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalSave = (data) => {
    let newTransactions = Object.assign([], filteredTransactions);

    if (data._id) {
      api.updateTransaction(data);
      newTransactions = filteredTransactions.filter(
        (transaction) => transaction._id !== data._id
      );
    } else {
      api.addTransaction(data);
    }
    newTransactions.push(data);
    setFilteredTransactions(newTransactions);
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center' }}>Controle Financeiro Pessoal</h2>
      <PeriodFilter onDateChange={handleDateChange} />
      <Summary transactionList={filteredTransactions} />
      <DescriptionFilter onFilterChange={handleFilterChange} />
      <button
        className="btn waves-effect"
        style={{ width: '150px', margin: '10px' }}
        onClick={handleNewTransactionClick}
      >
        Novo lançamento
      </button>
      <Transactions
        transactionList={filteredTransactions}
        onDeleteTransaction={handleDeleteTransaction}
        onEditTransaction={handleEditTransaction}
      />
      {isModalOpen && (
        <ModalTransaction
          selectedTransaction={selectedTransaction}
          onClose={handleModalClose}
          onSave={handleModalSave}
        ></ModalTransaction>
      )}
    </div>
  );
}
