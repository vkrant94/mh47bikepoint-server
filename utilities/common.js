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

module.exports = { extractInsertQueryTokens, extractUpdateQueryTokens };
