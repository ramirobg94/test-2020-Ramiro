const { Invoice } = require("./index");

const INVOICE_WITH_ITEMS = {
  id: "aeiou",
  lineItems: [
    {
      quantity: 5,
      unitPrice: 4
    },
    {
      quantity: 2,
      unitPrice: 3
    }
  ]
};
const INVOICE_WITHOUT_ITEMS = {
  id: "aeiou",
  lineItems: []
};
const INVOICE_WITHOUT_ARRAY = {
  id: "aeiou",
  lineItems: 'a'
};

describe("Total amount", () => {
  test("Total amount is 26", () => {
    const totalAmount = Invoice.computeTotalAmount({ invoice: INVOICE_WITH_ITEMS });
    expect(totalAmount).toBe(26);
  });

  test("Total amount is 0", () => {
    const totalAmount = Invoice.computeTotalAmount({
      invoice: INVOICE_WITHOUT_ITEMS
    });
    expect(totalAmount).toBe(0);
  });
  test("Total amount is 0, because lineItems is not an array", () => {
    const totalAmount = Invoice.computeTotalAmount({
      invoice: INVOICE_WITHOUT_ARRAY
    });
    expect(totalAmount).toBe(0);
  });
});

describe("Prepare invoice", () => {
  test("Parepare invoice with date of today", () => {
    const invoiceToPrint = Invoice.prepareInvoiceToPrint({ invoice: INVOICE_WITH_ITEMS });
    expect(invoiceToPrint).toEqual({
      date: "3/31/2020",
      invoice: "XXX",
      customer: "YYY",
      lineItems: [{
        department: "A01",
        quantity: 57,
        product: "A23487",
        unitPrice: 0.99,
        price: 56.33
      }, {
        department: "A07",
        quantity: 5,
        product: "A34578",
        unitPrice: 80,
        price: 400
    }],
    total: 456.33
    });
  });
});





/*

*/