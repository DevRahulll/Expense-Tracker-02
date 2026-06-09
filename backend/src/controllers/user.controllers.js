import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import userModels from "../models/user.models.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.utils.js";

const optionalConfiguration={
    maxAge:24*60*60*1000,
    httpOnly:true,
    secure:false,
    sameSite:'stric'
}

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) throw ApiError.fields();

        const isExisted = await userModels.findOne(email);
        if (isExisted) throw ApiError.conflict("User already existed");

        await userModels.create({
            fullName,
            email,
            password,
        });

        const newlyUser = await userModels.findOne(email);
        if (!newlyUser) throw ApiError.notFound("No users founds");

        console.log(newlyUser);

        const UserObj = newlyUser.toObject();
        delete UserObj.password;

        ApiResponse.created(res, "User register successful", userObj);
    } catch (error) {
        console.error("Internal server error", error.message);
        throw ApiError.internalError();
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw ApiError.fields();

        const user = await userModels.findOne(email).select("+password");
        if (!user) throw ApiError.notFound("No user found");

        const isMatch = await isExistedUser.comparePassword(password);
        if(!isMatch) throw ApiError.fields("Invalid credentials");

        // generate token 
        const accessToken=await generateAccessToken({id:user._id})
        const refreshToken=await generateRefreshToken({id:user._id})
        // set token in cookies

        user.refreshToken=refreshToken;
        user.save({validateBeforeSave:false})

        res.cookie("access-token",accessToken,optionalConfiguration);
        res.cookie("refresh-token",refreshToken,optionalConfiguration);

        const UserObj=user.toObject();
        delete UserObj.password;
        delete UserObj.refreshToken;

        //send response
        ApiResponse.ok(res,"User Logged In successful",userObj);
    } catch (error) {
        console.error("Internal server error", error.message);
        throw ApiError.internalError();
    }
};

export const getProfile=async(req,res)=>{
   try {
     const user=req.user;
    if(!user) ApiError.conflict("Something went Wrong! login agan");

    ApiResponse.ok(res,"User profile",user);
    } catch (error) {
    ApiError.internalError();
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearcookies("access-token");

        ApiResponse.noContent(res,"Logout successful");
    } catch (error) {
        ApiError.internalError();
    }
}