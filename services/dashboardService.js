const pool = require("../database/db");
const common = require("../utilities/common");

const getDashboard = async () => {
  return {
    monthlySales: {
      labels: ["October", "November", "December"],
      datasets: [
        {
          label: "Monthly Sales",
          data: [65, 59, 80],
        },
      ],
    },
  };
};

module.exports = {
  getDashboard,
};
