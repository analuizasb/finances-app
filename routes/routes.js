import express from 'express';
import transactionService from '../services/transactionService.js';
const transactionRouter = express.Router();

transactionRouter.get('/', transactionService.getAllFromPeriod);
transactionRouter.post('/', transactionService.create);
transactionRouter.put('/:id', transactionService.update);
transactionRouter.delete('/:id', transactionService.deleteTransaction);

export default transactionRouter;
