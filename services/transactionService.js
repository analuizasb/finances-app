import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
import TransactionModel from '../models/TransactionModel.js';
import transactionRouter from '../routes/routes.js';
// CREATE
const create = async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    newTransaction.save();
    res.send('Transação salva com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao tentar adicionar: ' + error.message);
  }
};

// RETRIEVE
const getAllFromPeriod = async (req, res) => {
  try {
    const filterPeriod = req.query.period;
    if (!filterPeriod)
      res
        .status(400)
        .send(
          'É necessário informar o período (period) no formato yyyy-mm (ex: period=2019-02)'
        );
    const allTransactions = await TransactionModel.find({
      yearMonth: filterPeriod,
    });
    res.send(allTransactions);
  } catch (error) {
    res.status(500).send('Erro ao tentar buscar as transações!');
  }
};

// UPDATE
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const transactionToUpdate = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (transactionToUpdate)
      res.send(
        `Transação "${transactionToUpdate.description}" atualizada com sucesso!`
      );
    else res.status(404).send('Transação não encontrada!');
  } catch (error) {
    res.status(500).send('Erro ao tentar atualizar: ' + error.message);
  }
};

// DELETE
const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const transactionToDelete = await TransactionModel.findByIdAndDelete({
      _id: id,
    });
    if (transactionToDelete)
      res.send(
        `Transação "${transactionToDelete.description}" deletada com sucesso!`
      );
    else res.status(404).send('Transação não encontrada!');
  } catch (error) {
    res.status(500).send('Erro ao tentar deletar: ' + error.message);
  }
};

export default { create, getAllFromPeriod, update, deleteTransaction };
