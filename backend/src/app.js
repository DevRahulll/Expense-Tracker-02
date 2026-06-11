import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import budgetRoutes from "./routes/budget.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
    res.send("OK");
});

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/transactions", transactionRoutes);

app.use("/api/v1/stats", statsRoutes);

app.use("/api/v1/budgets", budgetRoutes);

export default app;
