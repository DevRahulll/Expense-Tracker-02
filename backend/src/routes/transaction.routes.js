import express from "express";
import {
    createTransaction,
    deleteTransactions,
    getAllTransactions,
    getTransactionsCSV,
    updateTransaction,
} from "../controllers/transaction.controller.js";
import { authUser } from "../middleware/authUser.js";

const transactionRouter = express.Router();

transactionRouter.get("/", authUser, getAllTransactions);

transactionRouter.post("/", authUser, createTransaction);

transactionRouter.put("/:id", authUser, updateTransaction);

transactionRouter.delete("/:id", authUser, deleteTransactions);

transactionRouter.get("/export", authUser, getTransactionsCSV);

export default transactionRouter;
