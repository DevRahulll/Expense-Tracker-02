import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRouter from "./routes/user.routes.js";
import transactionRouter from "./routes/transaction.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
    res.send("OK");
});

app.use("/api/v1/users", userRouter);

app.use("/api/v1/transactions", transactionRouter);

export default app;
