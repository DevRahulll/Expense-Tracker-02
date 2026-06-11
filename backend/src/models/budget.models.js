import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        category: {
            type: String,
            trim: true,
            lowercase: true,
            enum: [
                "food",
                "transport",
                "housing",
                "entertainment",
                "health",
                "education",
                "shopping",
                "other",
            ],
            default: "other",
            required: [true, "Category is required"],
        },
        limit: {
            type: Number,
            required: [true, "Limit is required"],
            min: [1, "Budget limit must be greater than 0"],
        },
        month: {
            type: String,
            required: [true, "Budget month is required"],
            match: [/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"],
        },
    },
    { timestamps: true },
);

export default mongoose.model("Budget", budgetSchema);
