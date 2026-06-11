import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "fullName is required"],
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Email is required"],
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
            index: true,
        },
        password: {
            type: String,
            required: [true, "password is requird"],
            minlength: 6,
            select: false,
        },
        currency: {
            type: String,
            enum: ["INR", "USD"],
            default: "INR",
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (clientPassword) {
    return bcrypt.compare(clientPassword, this.password);
};

export default mongoose.model("User", UserSchema);
