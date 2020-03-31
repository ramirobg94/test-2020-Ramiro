const Api = require("./api");
const config = require("./config");

const utils = require('./utils')

const Code = async () => {
  let context = {};
  try {
    const { token } = await Api.login(context, config.TEST_CONFIG.auth);
    context = {...context, token }
    
    const { data: invoice } = await Api.getInvoices(context, {invoiceId: config.TEST_CONFIG.invoiceId})
    console.log(invoice)
    const totalAmount = utils.Invoice.computeTotalAmount(context,{invoice})
    console.log("totalAmount", totalAmount)
    const invoiceToPrint = utils.Invoice.prepareInvoiceToPrint(context,{invoice})    
    console.log({invoiceToPrint: JSON.stringify(invoiceToPrint)})
    const responseToPrint = await Api.sendInvoiceToPrint(context, {invoice: invoiceToPrint})
    console.log({responseToPrint})
    const invoiceExtendedToPrint = await utils.Invoice.prepareInvoiceExtendToPrint(context,{invoice})    
    
    console.log({invoiceExtendedToPrint})

  } catch (err) {
    console.error(err);
  }
};

Code();
