import ApiError from "../utils/api-error.js";
import { verifyAccessToken } from "../utils/jwt.utils.js";
import userModels from "../models/user.models.js";

export const authUser = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) ApiError.unauthorized("Not allowed");

        const decoded = await verifyAccessToken(accessToken);
        if (!decoded) ApiError.unauthorized("Unauthorized ! Login again");

        const user = await userModels.findById(decoded.id);
        if (!user) throw ApiError.unauthorized("User no Exists");

        req.user = user;

        next();
    } catch (error) {
        ApiError.unauthorized();
    }
};
