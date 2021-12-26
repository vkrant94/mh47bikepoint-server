const Pool = require("pg").Pool;

const localPool = new Pool({
  user: "postgres",
  password: "sap@78Guns",
  database: "MH47_BikePoint",
  host: "localhost",
  port: 5432,
});

module.exports = localPool;
