const envInstance = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET,
    jwt_access_expiry:process.env.JWT_ACCESS_EXPIRY || "15m",
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expiry:process.env.JWT_REFRESH_EXPIRY || "1d",
};

export default envInstance;
