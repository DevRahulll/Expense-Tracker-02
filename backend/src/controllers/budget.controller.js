import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import budgetModels from "../models/budget.models.js";

export const getBudgets = async (req, res) => {
    try {
        const user = req.user;
        if (!user) throw ApiError.unauthorized("Login Again");

        const budgets = await budgetModels.find({ userId: user._id });
        if (!budgets) throw ApiError.conflict("Not found! Login Again");

        ApiResponse.ok(res, "Budget", budgets);
    } catch (error) {
        throw ApiError.internalError();
    }
};

export const createBudgets = async (req, res) => {
    try {
        const { category, limit, month } = req.body;
        if (!category || !limit || !month)
            throw ApiError.fields("All fields are required");

        const budget = await budgetModels.findOneAndUpdate(
            {
                userId: req.user._id,
                category,
                month,
            },
            {
                limit,
            },
            {
                upsert: true,
                new: true,
                runValidators: true,
            },
        );
        if (!budget) throw ApiError.conflict("Something wrong! Retry");

        ApiResponse.created(res, "Budget saved successful", budget);
    } catch (error) {
        throw ApiError.internalError();
    }
};

export const updateBudgets = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit } = req.body;

        if (!id || limit == null)
            throw ApiError.fields("some fields are missing! Retry again");

        const updatedBudget = await budgetModels.findByIdAndUpdate(
            id,
            { limit },
            {
                new: true,
                runValidators: true,
            },
        );
        if (!updatedBudget) throw ApiError.notFound("Budget not found");

        ApiResponse.ok(res, "Budget updated successfully", updatedBudget);
    } catch (error) {
        throw ApiError.internalError();
    }
};

export const deleteBudgets = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw ApiError.conflict("Id not found");

        const budget = await budgetModels.findById(id);
        if (!budget) throw ApiError.notFound("Budget not found");

        await budget.deleteOne();

        ApiResponse.ok(res, "Budget deleted successful");
    } catch (error) {
        throw ApiError.internalError();
    }
};
