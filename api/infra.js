const fetch = require("node-fetch");

const config = require("../config");

module.exports = async ({ url, method, body = false, context }) => {
  try {
    const response = await fetch(`${config.BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(context && context.token
          ? { Authorization: `Bearer ${context.token}` }
          : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    return await response.json();
  } catch (err) {
    console.log(`Error ${url}`, err);
  }
};

