const fetch = require("./infra");
const { API_ROUTES } = require("./contants");

const api = {
  login: async (context, { username, password }) =>
    fetch({
      url: API_ROUTES.login,
      method: "POST",
      body: { username, password },
      context
    }),
  getInvoices: async (context, { invoiceId }) =>
    fetch({
      url: `${API_ROUTES.invoices}/${invoiceId}`,
      method: "GET",
      context
    })
};

module.exports = api;
