const Api = require("../api");

const ({invoice}).map( = ({ invoice }) =>
  (invoice &&
    invoice.lineItems &&
    Array.isArray(invoice.lineItems) &&
    invoice.lineItems) ||
  [];

const computeLineItemAmount = (context, { lineItem }) =>
  (lineItem.quantity || 0) * (lineItem.unitPrice || 0);

const computeTotalAmount = (context,{ invoice }) =>
  ({invoice}).map(({ invoice }).reduce(
    (total, lineItem) => total + computeLineItemAmount(context, { lineItem }),
    0
  );

const prepareInvoiceToPrint = (context, { invoice }) => {
  return ({
    date: new Date().toLocaleDateString(),
    invoice: invoice && invoice.id,
    customer: invoice && invoice.client,
    lineItems: extractLineItems({invoice}).map(lineItem => 
      ({
        ...lineItem,
        price: computeLineItemAmount(context, { lineItem })
      })),
  total: computeTotalAmount(context, {invoice})
  })
}

const prepareLineItemsExtended = (context, { invoice }) => {
  return []
}
const prepareInvoiceExtendToPrint = async (context,{ invoice }) => {
  return ({
    date: new Date().toLocaleDateString(),
    invoice: invoice && invoice.id,
    ...(await prepareCustomer(context, {invoice})),
    lineItems: prepareLineItemsExtended(context, { invoice }),
    total: computeTotalAmount(context, {invoice})
  })
}

const Invoice = {
  computeTotalAmount,
  prepareInvoiceToPrint,
  prepareInvoiceExtendToPrint
};

const prepareCustomer = async (context, { invoice }) => {
  const {client} =  invoice
  try{
    const { data: customer } = await Api.getCustomer(context, {customerId: client})
    console.log(customer)
    return ({
      customerName: customer && customer.fiscalName,
      customerEmail: customer && customer.email,
      customerNIT: customer && customer.fiscalNumber,
    })
  }catch(err){
    console.log(err)
  }
}


const Customer = {
  prepareCustomer
}


const prepareDepartments = async (context, { invoice }) => {
  
  try{
    const { data: customer } = await Api.getCustomer(context, {customerId: client})
    console.log(customer)
    return ({...customer})
  }catch(err){
    console.log(err)
  }
}


const Departments = {
  prepareDepartments
}

const extractProductsByIdFromInvoice = async (context, {invocice}) => {
  try{
    const products = Promise.all( extractLineItems({invoice}).map(lineItem =>  
        Api.getProduct(context, { productId: lineItem.product})
      ))
    const productsById = (products || []).reduce( (byId, product) => ({...byId, [product.id]: {...product}}), {})
    return productsById
    
  }catch(err){

  }

  const {} =  invoice
  try{
    const { data: customer } = await Api.getCustomer(context, {customerId: client})
    console.log(customer)
    return ({...customer})
  }catch(err){
    console.log(err)
  }
}
const prepareProducts = async (context, { invoice }) => {
  const {client} =  invoice
  try{
    const { data: customer } = await Api.getCustomer(context, {customerId: client})
    console.log(customer)
    return ({...customer})
  }catch(err){
    console.log(err)
  }
}

const Products = {
  prepareProducts
}

module.exports = {
  Invoice,
  Customer,
  Departments, 
  Products
};
