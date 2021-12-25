const pool = require("../database/db");
const common = require("../utilities/common");

const createStore = async (body) => {
  const { columnNames, values, parameters } =
    common.extractInsertQueryTokens(body);

  await pool.query(
    `INSERT INTO sales.stores (${columnNames}) values (${parameters})`,
    values
  );

  return { success: "Store added successfully." };
};

const updateStore = async (id, body) => {
  const properties = common.extractUpdateQueryTokens(body);
  const updateStatus = await pool.query(
    `UPDATE sales.stores SET ${properties} WHERE store_id='${id}'`
  );

  if (updateStatus.rowCount === 0) throw new Error("Store not found");

  return { success: "Store updated successfully." };
};

const deleteStore = async (id) => {
  const deleteStatus = await pool.query(
    `DELETE FROM sales.stores WHERE store_id='${id}'`
  );

  if (deleteStatus.rowCount === 0) throw new Error("Store not found");

  return { success: "Store Deleted Successfully." };
};

const getStores = async () => {
  const stores = await pool.query(`SELECT * FROM sales.stores`);
  return stores.rows;
};

const getStore = async (id) => {
  const stores = await pool.query(
    `SELECT * FROM sales.stores WHERE store_id='${id}'`
  );

  if (stores.rowCount === 0) throw new Error("Store not found");

  return stores.rows[0];
};

module.exports = {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
};
