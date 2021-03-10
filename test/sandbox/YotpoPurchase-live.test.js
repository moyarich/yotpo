const chai = require("chai");
const expect = chai.expect;
const fetch = require("node-fetch");

const { Yotpo, YotpoPurchase } = require("@moyarich/yotpo");
const yotpoCredentials = require("../yotpoCredentials");

/**
 * Yotpo API access files
 * This is a live test that uses Yotpo's Sandbox
 *
 * @see https://apidocs.yotpo.com/reference#introduction-to-purchases
 */

const ytpo = new Yotpo(yotpoCredentials, fetch);
ytpoPurchase = new YotpoPurchase(ytpo);

//*****************************************************************************

describe("Yotpo Connection", () => {
  it("Should create order", async () => {
    const orders = {
      platform: "general",
      startDate: 20200618,
      endDate: 20200218,
      orderType: "all",
      orders: [
        {
          email: "example@YAHOO.COM",
          customer_name: "Tony Dawn",
          order_id: "7874147",
          order_date: "2020-05-18",
          currency_iso: "USD",
          custom_properties: [
            {
              name: "SaleSource",
              value: "Web",
            },
            {
              name: "SaleType",
              value: "W",
            },
          ],
          customer: {
            state: "TX",
            country: "US",
            address: "1640 Drive 544",
            phone_number: "872-833-9300",
          },
          products: {
            4714106: {
              name: "Test Product - Inspire nitrile gloves medium 300/box",
              url:
                "https://www.example.com/catalog/infection-control/nitrile-gloves/inspire",
              currency: "USD",
              price: 17.45,
              group_name: "drcch",
              image:
                "https://www.example.com/photos/products/small/DRCCH.5213398d5eb93e34acdc62d074aeab9d.jpg",
              specs: {
                brand: "Cranberry",
              },
              description: "",
            },
          },
        },
      ],
    };

    result = await ytpoPurchase.create_mass_purchases(orders);
    expect(result, "Order was not created on Yotpo's sandbox").to.have.property(
      "message",
      "OK"
    );
  });
});
