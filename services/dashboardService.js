const transactionService = require("../services/transactionService");
const productService = require("../services/productService");
const commonService = require("../utilities/common");
const pool = require("../database/db");
const BIKE_PURCHASE = "Bike Purchase";
const PERSONAL = "Personal";

const getBikePurchaseTransactions = async (year) => {
  const transactions = await transactionService.getTransactionByYear(year);

  return transactions.filter((t) => t.transaction_type === BIKE_PURCHASE);
};

const getSalesOverview = async (year, month, filterKey) => {
  let bikePurchaseTransactions = await getBikePurchaseTransactions(year);

  if (month) {
    bikePurchaseTransactions = commonService.filterItemsByMonth(
      bikePurchaseTransactions,
      month,
      "end_date"
    );
  }

  const { graphLabels, graphData } = month
    ? transactionService.getTransactionsGraphDataByMonths(
        bikePurchaseTransactions,
        filterKey
      )
    : transactionService.getTransactionsGraphDataByYears(
        bikePurchaseTransactions,
        filterKey
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
  let products = await productService.getProducts();
  const bikeCategories = await pool.query(
    "SELECT * FROM production.bike_categories"
  );

  if (month) {
    bikePurchaseTransactions = commonService.filterItemsByMonth(
      bikePurchaseTransactions,
      month,
      "end_date"
    );
  }

  bikePurchaseTransactions = bikePurchaseTransactions.map((t) => {
    const product = products.find((p) => p.product_id == t.product_id);
    return {
      ...t,
      product_category: product
        ? bikeCategories.rows.find(
            (bc) => bc.category_id === product.category_id
          ).category_name
        : "",
    };
  });

  const { graphLabels, graphData } =
    transactionService.groupVisitorsByBikeCategory(bikePurchaseTransactions);

  return {
    visitors: {
      labels: graphLabels,
      datasets: [
        {
          data: graphData,
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    },
  };
};

const getPersonalExpenseOverview = async (year, month, filterKey) => {
  const transactions = await transactionService.getTransactionByYear(year);
  let personalTransactions = transactions.filter(
    (t) => t.transaction_type === PERSONAL
  );

  if (month) {
    personalTransactions = commonService.filterItemsByMonth(
      personalTransactions,
      month,
      "end_date"
    );
  }

  const { graphLabels, graphData } = month
    ? transactionService.getTransactionsGraphDataByMonths(
        personalTransactions,
        filterKey
      )
    : transactionService.getTransactionsGraphDataByYears(
        personalTransactions,
        filterKey
      );

  return {
    labels: graphLabels,
    datasets: [
      {
        label: "Personal Expenditure",
        data: graphData,
        fill: true,
        borderColor: "#42A5F5",
        tension: 0.4,
      },
    ],
  };
};

module.exports = {
  getSalesOverview,
  getVisitorsOverview,
  getPersonalExpenseOverview,
};
