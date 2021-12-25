const pool = require("../database/db");
const common = require("../utilities/common");

const createTransaction = async (body) => {
  const { columnNames, values, parameters } =
    common.extractInsertQueryTokens(body);

  await pool.query(
    `INSERT INTO sales.transactions (${columnNames}) values (${parameters})`,
    values
  );

  return { success: "Transaction added successfully." };
};

const updateTransaction = async (id, body) => {
  const properties = common.extractUpdateQueryTokens(body);
  const updateStatus = await pool.query(
    `UPDATE sales.transactions SET ${properties} WHERE transaction_id='${id}'`
  );

  if (updateStatus.rowCount === 0) throw new Error("Transaction not found");

  return { success: "Transaction updated successfully." };
};

const deleteTransaction = async (id) => {
  const deleteStatus = await pool.query(
    `DELETE FROM sales.transactions WHERE transaction_id='${id}'`
  );

  if (deleteStatus.rowCount === 0) throw new Error("Transaction not found");

  return { success: "Transaction Deleted Successfully." };
};

const getTransactions = async () => {
  const transactions = await pool.query(`SELECT * FROM sales.transactions`);

  return transactions.rows;
};

const getTransaction = async (id) => {
  const transactions = await pool.query(
    `SELECT * FROM sales.transactions WHERE transaction_id='${id}'`
  );

  if (transactions.rowCount === 0) throw new Error("Transaction not found");

  return transactions.rows[0];
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};