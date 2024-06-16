import mysql from "mysql2";

// Configuring the database connection
// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 30000,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.log("Error connecting to the database", err.message);
    throw err;
  }

  console.log("Database connected successfully");
});

export default pool;
