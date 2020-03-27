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
});
