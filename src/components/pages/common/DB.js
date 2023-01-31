var knex = require("knex")({
  client: "pg",
  connection: {
    user: "postgres",
    database: "hcm",
    host: "103.74.122.203",
    password: "FscHcm123!@#",
    port: 5432,
    max: 10,
  },
});

module.exports = knex;
