import ApiError from "../utils/api-error.js";
import { verifyAccessToken } from "../utils/jwt.utils.js";
import userModels from "../models/user.models.js";


export const authUser=async(req,res,next)=>{
    try {
        const {accessToken}=req.cookies;

    if(!accessToken) ApiError.unauthorized();

    const decoded=verifyAccessToken(accessToken);
    if(!decoded) ApiError.unauthorized("Unauthorized ! Login again");

    const user=userModels.findById(decoded.id)
    console.log(user);

    req.user=user;
    next(); 
    } catch (error) {
        ApiError.unauthorized();
    }
}