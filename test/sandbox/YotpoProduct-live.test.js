const chai = require("chai");
const expect = chai.expect;

const fetch = require("node-fetch");

const { Yotpo, YotpoProduct } = require("@moyarich/yotpo");
const yotpoCredentials = require("../yotpoCredentials");

/**
 * Yotpo API access files
 * This is a live test that uses Yotpo's Sandbox
 *
 * @see https://apidocs.yotpo.com/reference#introduction-to-products
 */

const ytpo = new Yotpo(yotpoCredentials, fetch);
ytpoProduct = new YotpoProduct(ytpo);

//*****************************************************************************

describe("Yotpo create_mass_products", () => {
  let products;

  beforeEach(() => {
    const productList = {
      return_email_address: process.env.YOTPO_RETURN_EMAIL_ADDRESS,
      result_callback_url: process.env.YOTPO_PRODUCT_WEBHOOKURL_SANDBOX,
      products: {
        5020172: {
          name: "Rigid Wood",
          url:
            "https://www.example.com/catalog/instruments/hu-friedy-lab-instruments/rigid-wood",
          currency: "USD",
          price: 32,
          group_name: "awsde",
          image_url: "https://www.example.com/photos/products/e18e6550b3c.jpg",
          specs: {
            brand: "Hu-Friedy",
            upc: "",
            mpn: "2LMBGH",
          },
          description: "",
        },
        5020180: {
          name: "Standard Lab Spatula",
          url:
            "https://www.example.com/catalog/instruments/hu-friedy-lab-instruments/spatula",
          currency: "USD",
          price: 26,
          group_name: "awsde",
          image_url: "https://www.example.com/photos/products/e18dsf0b3c.jpg",
          specs: {
            brand: "Hu-Friedy",
            upc: "",
            mpn: "3LMBBM",
          },
          description: "",
        },
      },
    };
  });

  it("Should have result with property {message: 'OK'}", async () => {
    products = {
      4714106: {
        name: "Test Product - Inspire nitrile gloves medium 300/box",
        url: "https://www.example.com/catalog/gloves/inspire",
        currency: "USD",
        price: 17.45,
        group_name: "drcch",
        image: "https://www.example.com/photos/products/small/DRCcb9d.jpg",
        specs: {
          brand: "Cranberry",
        },
        description: "I am a product",
      },
    };

    const productList = {
      return_email_address: process.env.YOTPO_RETURN_EMAIL_ADDRESS,
      result_callback_url: process.env.YOTPO_PRODUCT_WEBHOOKURL_SANDBOX,
      products,
    };

    let result = await ytpoProduct.create_mass_products(productList);

    expect(result, "Product was not created").to.have.property("message", "OK");
  });
});
