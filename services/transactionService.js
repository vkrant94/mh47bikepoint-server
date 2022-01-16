const pool = require("../database/db");
const common = require("../utilities/common");
const { INDEX_TO_MONTH } = require("../services/constants");
const _ = require("lodash");

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

  return transactions.rows.map((r) => {
    return {
      ...r,
      end_date: new Date(r.end_date),
      start_date: new Date(r.start_date),
      trans_amount: parseFloat(r.trans_amount),
      paid_amount: parseFloat(r.paid_amount),
    };
  });
};

const getTransactionsGraphDataByMonths = (transactions, filterKey) => {
  const groupByDays = common.groupItemsByMonth(transactions);

  const graphLabels = Object.keys(groupByDays).sort((a, b) => a - b);
  const graphData = graphLabels.map((si) =>
    !filterKey ? groupByDays[si].length : _.sumBy(groupByDays[si], filterKey)
  );
  return { graphLabels, graphData };
};

const getTransactionsGraphDataByYears = (transactions, filterKey) => {
  const groupByMonths = common.groupItemsByYear(transactions);

  const sortedDateIndexes = Object.keys(groupByMonths).sort((a, b) => a - b);
  const graphData = sortedDateIndexes.map((si) =>
    !filterKey
      ? groupByMonths[si].length
      : _.sumBy(groupByMonths[si], filterKey)
  );
  const graphLabels = sortedDateIndexes.map((si) => INDEX_TO_MONTH[si]);
  return { graphLabels, graphData };
};

const groupVisitorsByBikeCategory = (transactions) => {
  const groupByCategory = common.groupItemByKey(
    transactions,
    "product_category"
  );

  const graphLabels = Object.keys(groupByCategory);
  const graphData = graphLabels.map((gl) => groupByCategory[gl].length);
  return { graphLabels, graphData };
};

module.exports = {
  getTransactions,
  getTransaction,
  getTransactionByYear,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsGraphDataByYears,
  getTransactionsGraphDataByMonths,
  groupVisitorsByBikeCategory,
};
