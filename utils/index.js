
const Invoice = {
    computeTotalAmount: ({invoice}) => (invoice && invoice.lineItems || []).reduce((total, lineItem) => total + (lineItem.quantity || 0)*(lineItem.unitPrice || 0),0)    
}

module.exports = {
    Invoice
}