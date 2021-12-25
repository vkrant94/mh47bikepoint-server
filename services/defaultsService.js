const pool = require("../database/db");

const getDefaults = async () => {
  const bikeCategories = await pool.query(
    "SELECT * FROM production.bike_categories"
  );
  const brands = await pool.query("SELECT * FROM production.brands");

  return { bikeCategories: bikeCategories.rows, brands: brands.rows };
};

module.exports = {
  getDefaults,
};
