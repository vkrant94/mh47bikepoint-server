const pool = require("../database/db");
const common = require("../utilities/common");

const createStaff = async (body) => {
  const { columnNames, values, parameters } =
    common.extractInsertQueryTokens(body);

  await pool.query(
    `INSERT INTO sales.staffs (${columnNames}) values (${parameters})`,
    values
  );

  return { success: "Staff added successfully." };
};

const updateStaff = async (id, body) => {
  const properties = common.extractUpdateQueryTokens(body);
  const updateStatus = await pool.query(
    `UPDATE sales.staffs SET ${properties} WHERE staff_id='${id}'`
  );

  if (updateStatus.rowCount === 0) throw new Error("Staff not found");

  return { success: "Staff updated successfully." };
};

const deleteStaff = async (id) => {
  const deleteStatus = await pool.query(
    `DELETE FROM sales.staffs WHERE staff_id='${id}'`
  );

  if (deleteStatus.rowCount === 0) throw new Error("Staff not found");

  return { success: "Staff Deleted Successfully." };
};

const getStaffs = async () => {
  const staffs = await pool.query(`SELECT * FROM sales.staffs`);

  return staffs.rows;
};

const getStaff = async (id) => {
  const staffs = await pool.query(
    `SELECT * FROM sales.staffs WHERE staff_id='${id}'`
  );

  if (staffs.rowCount === 0) throw new Error("Staff not found");

  return staffs.rows[0];
};

module.exports = {
  getStaffs,
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
};
