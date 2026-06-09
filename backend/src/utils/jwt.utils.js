import jwt from "jsonwebtoken"
import envInstance from '../config/envInstance.js'

const generateAccessToken=async function(payload){
    return jwt.sign(payload,envInstance.jwt_access_secret,{
        expiresIn:envInstance.jwt_access_expiry
    })
}
const generateRefreshToken=async function(payload){
    return jwt.sign(payload, envInstance.jwt_refresh_secret,{
        expiresIn:envInstance.jwt_refresh_expiry
    })
}
const verifyAccessToken=async function(token){
    return jwt.verify(token,envInstance.jwt_access_secret);
}
const verifyRefreshToken=async function(token){
    return jwt.verify(token,envInstance.jwt_refresh_secret);
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}