const pool = require("../database/db");
const common = require("../utilities/common");

const createTowingVan = async (body) => {
  const { columnNames, values, parameters } =
    common.extractInsertQueryTokens(body);

  await pool.query(
    `INSERT INTO production.towing_vans (${columnNames}) values (${parameters})`,
    values
  );

  return { success: "Towing Van added successfully." };
};

const updateTowingVan = async (id, body) => {
  const properties = common.extractUpdateQueryTokens(body);
  const updateStatus = await pool.query(
    `UPDATE production.towing_vans SET ${properties} WHERE van_id='${id}'`
  );

  if (updateStatus.rowCount === 0) throw new Error("Towing Van not found");

  return { success: "Towing Van updated successfully." };
};

const deleteTowingVan = async (id) => {
  const deleteStatus = await pool.query(
    `DELETE FROM production.towing_vans WHERE van_id='${id}'`
  );

  if (deleteStatus.rowCount === 0) throw new Error("Towing Van not found");

  return { success: "Towing Van deleted successfully." };
};

const getTowingVans = async () => {
  const towingVans = await pool.query(`SELECT * FROM production.towing_vans`);

  return towingVans.rows;
};

const getTowingVan = async (id) => {
  const towingVans = await pool.query(
    `SELECT * FROM production.towing_vans WHERE van_id='${id}'`
  );

  if (towingVans.rowCount === 0) throw new Error("Towing Van not found");

  return towingVans.rows[0];
};

module.exports = {
  createTowingVan,
  getTowingVans,
  getTowingVan,
  updateTowingVan,
  deleteTowingVan,
};
