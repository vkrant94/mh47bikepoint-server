const transactionService = require("../services/transactionService");
const commonService = require("../utilities/common");
const BIKE_PURCHASE = "Bike Purchase";

const getBikePurchaseTransactions = async (year) => {
  const transactions = await transactionService.getTransactionByYear(year);

  return transactions
    .filter((t) => t.transaction_type === BIKE_PURCHASE)
    .map((t) => {
      return { ...t, end_date: new Date(t.end_date) };
    });
};

const getSalesOverview = async (year, month) => {
  let bikePurchaseTransactions = await getBikePurchaseTransactions(year);

  if (month) {
    bikePurchaseTransactions = commonService.filterItemsByMonth(
      bikePurchaseTransactions,
      month,
      "end_date"
    );
  }

  const { graphLabels, graphData } = month
    ? transactionService.groupSalesTransactionsByMonths(
        bikePurchaseTransactions,
        month
      )
    : transactionService.groupSalesTransactionsByYears(
        bikePurchaseTransactions
      );

  return {
    monthlySales: {
      labels: graphLabels,
      datasets: [
        {
          label: "Sales Overview",
          data: graphData,
          fill: true,
          borderColor: "#42A5F5",
          tension: 0.4,
        },
      ],
    },
  };
};

const getVisitorsOverview = async (year, month) => {
  let bikePurchaseTransactions = await getBikePurchaseTransactions(year);

  if (month) {
    bikePurchaseTransactions = commonService.filterItemsByMonth(
      bikePurchaseTransactions,
      month,
      "end_date"
    );
  }

  return {
    visitors: {
      labels: ["With Gear", "Without Gear", "E-Bikes"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    },
  };
};

module.exports = {
  getSalesOverview,
  getVisitorsOverview,
};
