const transactionService = require("../services/transactionService");
const BIKE_PURCHASE = "Bike Purchase";

const getDashboard = async (year, month) => {
  const transactions = await transactionService.getTransactionByYear(year);

  let bikePurchaseTransactions = transactions
    .filter((t) => t.transaction_type === BIKE_PURCHASE)
    .map((t) => {
      return { ...t, end_date: new Date(t.end_date) };
    });

  const { graphLabels, graphData } = month
    ? transactionService.groupTransactionsByMonths(
        bikePurchaseTransactions,
        month
      )
    : transactionService.groupTransactionsByYears(bikePurchaseTransactions);

  return {
    monthlySales: {
      labels: graphLabels,
      datasets: [
        {
          label: "Monthly Sales",
          data: graphData,
          fill: true,
          borderColor: "#42A5F5",
          tension: 0.4,
        },
      ],
    },
  };
};

module.exports = {
  getDashboard,
};
