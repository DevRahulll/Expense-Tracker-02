import "dotenv/config";

import app from "./src/app.js";
import connToDb from "./src/config/db.config.js";
import envInstance from "./src/config/envInstance.js";

const PORT = envInstance.PORT;

async function init() {
    try {
        await connToDb(process.env.MONGO_URI);

        app.listen(PORT, () => {
            console.log(
                `Server is running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`,
            );
        });
    } catch (error) {
        console.log("Error in Server ", error.message);
        process.exit(1);
    }
}

init();
