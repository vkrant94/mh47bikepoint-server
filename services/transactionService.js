const pool = require("../database/db");
const common = require("../utilities/common");
const { INDEX_TO_MONTH } = require("../services/constants");

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

const getTransactionByYear = async (year) => {
  const startDate = new Date(year, 0, 1).toISOString();
  const endDate = new Date(year, 11, 31).toISOString();
  const transactions = await pool.query(
    `SELECT * FROM sales.transactions where end_date BETWEEN '${startDate}' AND '${endDate}';`
  );

  if (transactions.rowCount === 0) throw new Error("Transaction not found");

  return transactions.rows;
};

const groupTransactionsByMonths = (transactions, month) => {
  transactions = transactions.filter(
    (t) => INDEX_TO_MONTH[t.end_date.getMonth()] === month
  );

  const groupByDays = {};
  transactions.forEach((t) => {
    const date = t.end_date.getDate();
    if (groupByDays.hasOwnProperty(date)) {
      const collection = groupByDays[date];
      collection.push(t);
    } else {
      groupByDays[date] = [t];
    }
  });

  const graphLabels = Object.keys(groupByDays).sort((a, b) => a - b);
  const graphData = graphLabels.map((si) => groupByDays[si].length);
  return { graphLabels, graphData };
};

const groupTransactionsByYears = (transactions) => {
  const groupByMonths = {};
  transactions.forEach((t) => {
    const date = t.end_date.getMonth();
    if (groupByMonths.hasOwnProperty(date)) {
      const collection = groupByMonths[date];
      collection.push(t);
    } else {
      groupByMonths[date] = [t];
    }
  });

  const sortedDateIndexes = Object.keys(groupByMonths).sort((a, b) => a - b);
  const graphData = sortedDateIndexes.map((si) => groupByMonths[si].length);
  const graphLabels = sortedDateIndexes.map((si) => INDEX_TO_MONTH[si]);
  return { graphLabels, graphData };
};

module.exports = {
  getTransactions,
  getTransaction,
  getTransactionByYear,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  groupTransactionsByYears,
  groupTransactionsByMonths,
};
