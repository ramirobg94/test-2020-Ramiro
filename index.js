const Api = require("./api");
const config = require("./config");

const utils = require('./utils')

const Code = async () => {
  let context = {};
  try {
    const { token } = await Api.login(context, config.TEST_CONFIG.auth);
    context = {...context, token }
    const { data: invoice } = await Api.getInvoices(context, {invoiceId: config.TEST_CONFIG.invoiceId})
    const totalAmount = utils.Invoice.computeTotalAmount({invoice})
    console.log("totalAmount", totalAmount)
  } catch (err) {
    console.error(err);
  }
};

Code();
