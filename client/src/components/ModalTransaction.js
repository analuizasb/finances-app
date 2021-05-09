import React, { useState } from 'react';

import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalTransaction({
  selectedTransaction,
  onClose,
  onSave,
}) {
  const [transactionData, setTransactionData] = useState(selectedTransaction);

  const handleSave = (event) => {
    event.preventDefault();
    onSave(transactionData);
  };

  const handleDescriptionChange = (event) => {
    const newTransactionData = Object.assign({}, transactionData);
    newTransactionData.description = event.target.value;
    setTransactionData(newTransactionData);
  };
  const handleCategoryChange = (event) => {
    const newTransactionData = Object.assign({}, transactionData);
    newTransactionData.category = event.target.value;
    setTransactionData(newTransactionData);
  };
  const handleTypeChange = (event) => {
    const newTransactionData = Object.assign({}, transactionData);
    newTransactionData.type = event.target.id;
    setTransactionData(newTransactionData);
  };
  const handleValueChange = (event) => {
    const newTransactionData = Object.assign({}, transactionData);
    newTransactionData.value = +event.target.value;
    setTransactionData(newTransactionData);
  };
  const handleDateChange = (event) => {
    const newTransactionData = Object.assign({}, transactionData);
    const newDate = event.target.value;
    newTransactionData.yearMonthDay = newDate;
    newTransactionData.day = +newDate.split('-')[2];
    newTransactionData.month = +newDate.split('-')[1];
    newTransactionData.year = +newDate.split('-')[0];
    newTransactionData.yearMonth = newDate.substring(0, 7);
    setTransactionData(newTransactionData);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <p>
          <label>
            <input
              name="group1"
              type="radio"
              id="+"
              checked={transactionData.type === '+'}
              onChange={handleTypeChange}
            />
            <span>Receita</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name="group1"
              type="radio"
              id="-"
              checked={transactionData.type === '-'}
              onChange={handleTypeChange}
            />
            <span>Despesa</span>
          </label>
        </p>
        <label htmlFor="description">Descrição:</label>
        <input
          id="description"
          type="text"
          className="validate"
          value={transactionData.description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="category">Categoria:</label>
        <input
          id="category"
          type="text"
          className="validate"
          value={transactionData.category}
          onChange={handleCategoryChange}
        />
        <label htmlFor="value">Valor:</label>
        <input
          id="value"
          type="number"
          className="validate"
          value={transactionData.value}
          onChange={handleValueChange}
        ></input>
        <label htmlFor="value">Data:</label>
        <input
          id="date"
          type="date"
          value={transactionData.yearMonthDay}
          onChange={handleDateChange}
        ></input>
        <button className="waves-effect waves-light btn " onClick={handleSave}>
          Salvar
        </button>
        <button className="waves-effect waves-light btn red" onClick={onClose}>
          Fechar
        </button>
      </Modal>
    </div>
  );
}
