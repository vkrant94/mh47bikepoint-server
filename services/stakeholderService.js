const pool = require("../database/db");
const common = require("../utilities/common");

const createStakeholder = async (body) => {
  const { columnNames, values, parameters } =
    common.extractInsertQueryTokens(body);

  await pool.query(
    `INSERT INTO sales.stakeholders (${columnNames}) values (${parameters})`,
    values
  );

  return { success: "Stakeholder added successfully." };
};

const updateStakeholder = async (id, body) => {
  const properties = common.extractUpdateQueryTokens(body);
  const updateStatus = await pool.query(
    `UPDATE sales.stakeholders SET ${properties} WHERE stakeholder_id='${id}'`
  );

  if (updateStatus.rowCount === 0) throw new Error("Stakeholder not found");

  return { success: "Stakeholder updated successfully." };
};

const deleteStakeholder = async (id) => {
  const deleteStatus = await pool.query(
    `DELETE FROM sales.stakeholders WHERE stakeholder_id='${id}'`
  );

  if (deleteStatus.rowCount === 0) throw new Error("Stakeholder not found");

  return { success: "Stakeholder Deleted Successfully." };
};

const getStakeholders = async () => {
  const stakeholders = await pool.query(`SELECT * FROM sales.stakeholders`);

  return stakeholders.rows;
};

const getStakeholder = async (id) => {
  const stakeholders = await pool.query(
    `SELECT * FROM sales.stakeholders WHERE stakeholder_id='${id}'`
  );

  if (stakeholders.rowCount === 0) throw new Error("Stakeholder not found");

  return stakeholders.rows[0];
};

module.exports = {
  getStakeholders,
  getStakeholder,
  createStakeholder,
  updateStakeholder,
  deleteStakeholder,
};
