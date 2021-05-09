import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

const getTransactions = async (period) => {
  const transactions = await axios.get(`${API_URL}?period=${period}`);
  return transactions.data;
};

const deleteTransaction = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

const updateTransaction = async (transactionData) => {
  const response = await axios.put(
    `${API_URL}/${transactionData._id}`,
    transactionData
  );
  console.log(response);
};

const addTransaction = async (transactionData) => {
  const response = await axios.post(`${API_URL}`, transactionData);
  console.log(response);
};

export default {
  getTransactions,
  deleteTransaction,
  updateTransaction,
  addTransaction,
};
