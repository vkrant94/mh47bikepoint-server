const pool = require("../database/db");
const common = require("../utilities/common");

const createCustomer = async (body) => {
  const { columnNames, values, parameters } =
    common.extractInsertQueryTokens(body);

  await pool.query(
    `INSERT INTO sales.customers (${columnNames}) values (${parameters})`,
    values
  );

  return { success: "Customer added successfully." };
};

const updateCustomer = async (id, body) => {
  const properties = common.extractUpdateQueryTokens(body);
  const updateStatus = await pool.query(
    `UPDATE sales.customers SET ${properties} WHERE customer_id='${id}'`
  );

  if (updateStatus.rowCount === 0) throw new Error("Customer not found");

  return { success: "Customer updated successfully." };
};

const deleteCustomer = async (id) => {
  const deleteStatus = await pool.query(
    `DELETE FROM sales.customers WHERE customer_id='${id}'`
  );

  if (deleteStatus.rowCount === 0) throw new Error("Customer not found");

  return { success: "Customer Deleted Successfully." };
};

const getCustomers = async () => {
  const customers = await pool.query(`SELECT * FROM sales.customers`);

  return customers.rows;
};

const getCustomer = async (id) => {
  const customers = await pool.query(
    `SELECT * FROM sales.customers WHERE customer_id='${id}'`
  );

  if (customers.rowCount === 0) throw new Error("Customer not found");

  return customers.rows[0];
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
