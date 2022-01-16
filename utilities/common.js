const { INDEX_TO_MONTH } = require("../services/constants");

const extractInsertQueryTokens = (requestBody) => {
  const columnNames = Object.keys(requestBody).join(",");
  const values = Object.values(requestBody);
  const parameters = getParameters(requestBody);

  return { columnNames, values, parameters };
};

const extractUpdateQueryTokens = (requestBody) => {
  const objectTokens = Object.entries(requestBody);

  return objectTokens.map((t) => `${t[0]}='${t[1]}'`).join(",");
};

function getParameters(requestBody) {
  const parameters = Object.keys(requestBody).map(
    (item, index) => `$${index + 1}`
  );

  return parameters.join(",");
}

function filterItemsByMonth(items, month, dateKey) {
  return items.filter((t) => INDEX_TO_MONTH[t[dateKey].getMonth()] === month);
}

function groupByProtype(items, callback) {
  const groupByDays = {};
  items.forEach((t) => {
    const key = callback(t);
    if (groupByDays.hasOwnProperty(key)) {
      const collection = groupByDays[key];
      collection.push(t);
    } else {
      groupByDays[key] = [t];
    }
  });

  return groupByDays;
}

function groupItemsByMonth(items) {
  return groupByProtype(items, (t) => t.end_date.getDate());
}

function groupItemsByYear(items) {
  return groupByProtype(items, (t) => t.end_date.getMonth());
}

function groupItemByKey(items, key) {
  return groupByProtype(items, (t) => t[key]);
}

module.exports = {
  extractInsertQueryTokens,
  extractUpdateQueryTokens,
  filterItemsByMonth,
  groupItemsByMonth,
  groupItemsByYear,
  groupItemByKey,
};
