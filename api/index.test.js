jest.mock("node-fetch");

const fetch = require("node-fetch");
const { Response } = jest.requireActual("node-fetch");

const Api = require("./index");
const config = require("../config");

describe("Login", () => {
  test("right login", async () => {
    const requestBody = { username: "username", password: "password" };
    const responseMocked = await new Response(
      JSON.stringify({ token: "TEST_TOKEN" })
    );
    fetch.mockReturnValue(responseMocked);

    const { token } = await Api.login({}, requestBody);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${config.BASE_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    fetch.mockClear();
    expect(token).toBe("TEST_TOKEN");
  });
});

describe("Invoice", () => {
  test("fetch invoice", async () => {
    const INVOICE_MOCK = {
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
    const responseMocked = await new Response(
      JSON.stringify({
        data: INVOICE_MOCK
      })
    );
    fetch.mockReturnValue(responseMocked);

    const { data: invoice } = await Api.getInvoices(
      { token: "TEST_TOKEN" },
      { invoiceId: "INVOICE_ID" }
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${config.BASE_URL}invoices/INVOICE_ID`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TEST_TOKEN"
        }
      }
    );
    expect(invoice).toEqual(INVOICE_MOCK);
  });
});
