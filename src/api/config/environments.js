import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    session_key: process.env.SESSION_KEY,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};