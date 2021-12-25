const Pool = require("pg").Pool;

const localPool = new Pool({
  user: "postgres",
  password: "Prorigo@123",
  database: "MH47_BikePoint",
  host: "localhost",
  port: 5432,
});

module.exports = localPool;
