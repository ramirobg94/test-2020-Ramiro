const extractLineItems = ({ invoice }) =>
  (invoice &&
    invoice.lineItems &&
    Array.isArray(invoice.lineItems) &&
    invoice.lineItems) ||
  [];

const computeLineItemAmount = ({ lineItem }) =>
  (lineItem.quantity || 0) * (lineItem.unitPrice || 0);

const computeTotalAmount = ({ invoice }) =>
  extractLineItems({ invoice }).reduce(
    (total, lineItem) => total + computeLineItemAmount({ lineItem }),
    0
  );

const Invoice = {
  computeTotalAmount
};

module.exports = {
  Invoice
};
