import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "UserId is required"],
            index: true,
        },
        transactionType: {
            type: String,
            enum: ["income", "expense"],
            default: "expense",
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [1, "Amount must be greater than 0"],
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
        description: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", "upi"],
            default: "cash",
        },
        isRecurring: {
            type: Boolean,
            default: false,
        },
        recurringFreq: {
            type: String,
            enum: ["daily", "weekly", "monthly"],
            required: function () {
                return this.isRecurring;
            },
        },
    },
    { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
