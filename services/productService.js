const pool = require("../database/db");
const common = require("../utilities/common");

const createProduct = async (body) => {
  const { columnNames, values, parameters } =
    common.extractInsertQueryTokens(body);

  await pool.query(
    `INSERT INTO production.products (${columnNames}) values (${parameters})`,
    values
  );

  return { success: "Product added successfully." };
};

const updateProduct = async (id, body) => {
  const properties = common.extractUpdateQueryTokens(body);
  const updateStatus = await pool.query(
    `UPDATE production.products SET ${properties} WHERE product_id='${id}'`
  );

  if (updateStatus.rowCount === 0) throw new Error("Product not found");

  return { success: "Product updated successfully." };
};

const deleteProduct = async (id) => {
  const deleteStatus = await pool.query(
    `DELETE FROM production.products WHERE product_id='${id}'`
  );

  if (deleteStatus.rowCount === 0) throw new Error("Product not found");

  return { success: "Product Deleted Successfully." };
};

const getProducts = async () => {
  const products = await pool.query(`SELECT * FROM production.products`);

  return products.rows;
};

const getProduct = async (id) => {
  const products = await pool.query(
    `SELECT * FROM production.products WHERE product_id='${id}'`
  );

  if (products.rowCount === 0) throw new Error("Product not found");

  return products.rows[0];
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
