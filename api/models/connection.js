import mysql from "mysql";
import dotenv from "dotenv";

// Loading the environment variables
dotenv.config();

// Configuring the database connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export default pool;
