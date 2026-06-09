import mongoose from "mongoose";

import ApiError from "../utils/api-error.js";

const connToDb = async (URL) => {
    try {
        if (!URL) {
            throw ApiError.conflict("Varibles not configured!");
        }

        mongoose.set("strictQuery", true);

        const conn = await mongoose.connect(URL);
        console.log("DB connected successful !", conn.connection.host);

        //connection events
        mongoose.connection.on("disconnected", () => {
            console.log("DB disconnected");
        });

        mongoose.connection.on("error", (err) => {
            console.error("DB error", err.message);
        });
    } catch (error) {
        console.error("DB connection Failed !", error.message);
        throw ApiError.conflict("Error in connecting database");
    }
};

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("DB connection closed!");
    process.exit(0);
});

export default connToDb;
