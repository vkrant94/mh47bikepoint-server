const pool = require("../database/db");
const common = require("../utilities/common");

const createGarage = async (body) => {
  const { columnNames, values, parameters } =
    common.extractInsertQueryTokens(body);

  await pool.query(
    `INSERT INTO production.garage (${columnNames}) values (${parameters})`,
    values
  );

  return { success: "Garage added successfully." };
};

const updateGarage = async (id, body) => {
  const properties = common.extractUpdateQueryTokens(body);
  const updateStatus = await pool.query(
    `UPDATE production.garage SET ${properties} WHERE garage_id='${id}'`
  );

  if (updateStatus.rowCount === 0) throw new Error("Garage not found");

  return { success: "Garage updated successfully." };
};

const deleteGarage = async (id) => {
  const deleteStatus = await pool.query(
    `DELETE FROM production.garage WHERE garage_id='${id}'`
  );

  if (deleteStatus.rowCount === 0) throw new Error("Garage not found");

  return { success: "Garage Deleted Successfully." };
};

const getGarages = async () => {
  const garages = await pool.query(`SELECT * FROM production.garage`);

  return garages.rows;
};

const getGarage = async (id) => {
  const garages = await pool.query(
    `SELECT * FROM production.garage WHERE garage_id='${id}'`
  );

  if (garages.rowCount === 0) throw new Error("Garage not found");

  return garages.rows[0];
};

module.exports = {
  getGarages,
  getGarage,
  createGarage,
  updateGarage,
  deleteGarage,
};
