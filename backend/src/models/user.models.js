import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "fullName is required"],
            minlength: 2,
            maxlength: 20,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "password is requird"],
            minlength: 6,
            select: false,
        },
        currency: {
            type: String,
            enum: ["INR", "DOLLAR"],
            default: "INR",
        },
    },
    { timestamps: true },
);

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model("User", UserSchema);
