import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

// const databaseConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };

// const connection = new Pool(databaseConfig);

const connection = new Pool({
  user: "postgres",
  password: "124816",
  host: "localhost",
  port: 5432,
  database: "linkr",
});

export default connection;
