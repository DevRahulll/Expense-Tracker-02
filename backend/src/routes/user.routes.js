import express from "express";
import {
    getAccessToken,
    getProfile,
    login,
    logout,
    register,
} from "../controllers/user.controllers.js";
import { authUser } from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/profile", authUser, getProfile);

userRouter.get("/get-accessToken", getAccessToken);

userRouter.post("/logout", authUser, logout);

export default userRouter;
