const pg = require("pg");

const pool = new pg.Pool({
  user: "postgres",
  database: "hcm",
  host: "103.74.122.203",
  password: "FscHcm123!@#",
  port: 5432,
  max: 10,
});
module.exports = pool;
