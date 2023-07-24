import mysql from "mysql2";

// Configuring the database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database", err.message);
    throw err;
  }

  console.log("Database connected successfully");
});

export default connection;
