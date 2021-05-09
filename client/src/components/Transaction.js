import React from 'react';
import css from './transaction.module.css';

export default function Transaction({ id, info, onDelete, onEdit }) {
  const handleDelete = () => {
    onDelete(id);
  };
  const handleEdit = () => {
    onEdit(id);
  };
  return (
    <div>
      <div
        className={`card ${css.transaction}`}
        style={{ backgroundColor: info.type === '+' ? '#00ff99' : '#ff5050' }}
      >
        <span className={`card-content ${css.transactionleft}`}>
          {info.day}
        </span>
        <span className={`card-content ${css.transactionleft}`}>
          {info.category}
        </span>
        <span className={`card-content ${css.transactionleft}`}>
          {info.description}
        </span>
        <span className={`card-content ${css.transactionleft}`}>
          R$ {info.value}
        </span>
        <span
          className={buttonStyle}
          style={{ cursor: 'pointer', textAlign: 'right' }}
          onClick={handleEdit}
        >
          edit
        </span>
        <span
          className={buttonStyle}
          style={{ cursor: 'pointer', textAlign: 'right' }}
          onClick={handleDelete}
        >
          delete
        </span>
      </div>
    </div>
  );
}

const buttonStyle = `material-icons right-align
 ${css.transactionright}`;
