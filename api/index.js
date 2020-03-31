const fetch = require("./infra");
const { API_ROUTES } = require("./constants");

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
    }),
  sendInvoiceToPrint: async (context, { invoice }) =>
    fetch({
      url: `${API_ROUTES.printer}`,
      method: "POST",
      body: invoice,
      context
    }),
    getCustomer: async (context, { customerId }) =>
    fetch({
      url: `${API_ROUTES.customers}/${customerId}`,
      method: "GET",
      context
    }),
    
};

module.exports = api;
