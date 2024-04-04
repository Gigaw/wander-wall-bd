import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "wander_wall",
});

const db = pool;
export default db;
