import express from "express";
import {
    createBudgets,
    deleteBudgets,
    getBudgets,
    updateBudgets,
} from "../controllers/budget.controller.js";
import { authUser } from "../middleware/authUser.js";

const budgetRouter = express.Router();

budgetRouter.get("/", authUser, getBudgets);
budgetRouter.post("/", authUser, createBudgets);
budgetRouter.put("/:id", authUser, updateBudgets);
budgetRouter.delete("/:id", authUser, deleteBudgets);

export default budgetRouter;
