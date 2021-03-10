const { Yotpo, YotpoProduct } = require("@moyarich/yotpo");
const fetch = require("node-fetch");

async function yotpo() {
  const yotpoCredentials = {
    ApiKey: process.env.YOTPO_LIVE_APIKEY,
    ApiSecret: process.env.YOTPO_LIVE_APISECRET,
  };

  const ytpo = new Yotpo(yotpoCredentials, fetch);

  const ytpoProduct = new YotpoProduct(ytpo);

  /**
   * For testing get a free webhook url from https://pipedream.com
   * ie : https://envuzoaboa0440hk.m.pipedream.net
   *
   * In production this should be a protected public url. Can be protected with JSON Web Token(JWT)
   */
  const webhookURL = process.env.YOTPO_PRODUCT_WEBHOOKUR;

  const productList = {
    return_email_address: process.env.YOTPO_RETURN_EMAIL_ADDRESS,
    result_callback_url: webhookURL,
    products: {
      5020172: {
        name: "Test Rigid Wood",
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
        name: "Test - Standard Lab Spatula",
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

  ytpoProduct.create_mass_products(productList);
}

yotpo();
