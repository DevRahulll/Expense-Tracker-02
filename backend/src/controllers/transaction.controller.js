import transactionModels from "../models/transaction.models.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";

export const createTransaction = async (req, res) => {
    try {
        const {
            transactionType,
            amount,
            category,
            description,
            date,
            paymentMethod,
            isRecurring,
            recurringFreq,
        } = req.body;

        if (!amount || !category)
            throw ApiError.fields("Amount and Category are mandatory");

        const user = req.user;
        if (!user) throw ApiError.unauthorized("Login Again!");

        const transaction = await transactionModels.create({
            userId: user._id,
            transactionType,
            amount,
            category,
            description,
            date,
            paymentMethod,
            isRecurring,
            recurringFreq,
        });

        ApiResponse.created(res, "Transaction created successful", transaction);
    } catch (error) {
        console.error("Error in transaction creating", error.message);
        throw ApiError.internalError();
    }
};

export const getAllTransactions = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) throw ApiError.unauthorized();

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const allTransactions = await transactionModels
            .find({ userId })
            .skip(skip)
            .limit(limit);

        if (allTransactions.length === 0) throw ApiError.notFound();

        ApiResponse.ok(res, "Transactions : ", allTransactions);
    } catch (error) {
        console.error("Error in transaction updation", error.message);
        throw ApiError.internalError();
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw ApiError.unauthorized("Id not found");

        const updateTransactionData = req.body;
        if (!updateTransactionData)
            throw ApiError.fields("update Data not found");

        // check transaction id , userId with req.user Id if matched place further else error
        const transactionData = await transactionModels.findById(id);
        if (!transactionData) throw ApiError.unauthorized();

        const userId = req.user._id;
        if (!userId) throw ApiError.unauthorized();

        console.log(userId, "\n", transactionData.userId);

        const isMatch = String(transactionData.userId) === String(userId);
        if (!isMatch)
            throw ApiError.unauthorized("Not allowed to makes changes");

        const updatedTransactions = await transactionModels.findByIdAndUpdate(
            id,
            updateTransactionData,
            {
                new: true,
                runValidators: true,
            },
        );
        if (!updatedTransactions) throw ApiError.conflict("Retry");

        ApiResponse.ok(res, "Updated successful : ", updatedTransactions);
    } catch (error) {
        console.error("Error in transaction updation", error.message);
        throw ApiError.internalError();
    }
};

export const deleteTransactions = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw ApiError.unauthorized("Id not found");

        const transaction = await transactionModels.findById(id);
        if (!transaction) throw ApiError.notFound("No transactions found");

        if (String(transaction.userId) !== String(req.user._id))
            throw ApiError.unauthorized("Not allowed");

        await transaction.deleteOne();

        ApiResponse.ok(res, "Deleted successful");
    } catch (error) {
        console.error("Error in transaction deletion", error.message);
        throw ApiError.internalError();
    }
};

export const getTransactionsCSV = async (req, res) => {
    try {
        const userId = req.user._id;

        const transactions = await transactionModels.find({ userId });

        let csv = "Type,Amount,Category,Description,Date,Payment Method\n";

        transactions.forEach((tx) => {
            csv += `${tx.transactionType},`;
            csv += `${tx.amount},`;
            csv += `${tx.category},`;
            csv += `"${tx.description || ""}",`;
            csv += `${tx.date.toISOString()},`;
            csv += `${tx.paymentMethod}\n`;
        });

        res.setHeader("Content-Type", "text/csv");

        res.setHeader(
            "Content-Disposition",
            "attachement; filename=transactions.csv",
        );

        return res.status(200).send(csv);
    } catch (error) {
        throw ApiError.internalError();
    }
};
