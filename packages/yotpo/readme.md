This is JavaScript (Node.js) Package for accessing the [Yotpo API](https://apidocs.yotpo.com/reference)


# Installation
Package has not been added to the NPM repository so use the downgit tool to download it
https://downgit.github.io/#/home



# NPM Package Requirements
[fetch](https://www.npmjs.com/package/node-fetch)

[querystring](https://www.npmjs.com/package/query-string/)

# Usage

In production result_callback_url should be a secure public url. Can be a webhook url protected with JSON Web Token(JWT).

For testing puposes - get a free webhook url from https://pipedream.com

For example: https://envuzoaboa0440hk.m.pipedream.net



## Connect to yotpo , and upload a product
```javascript
const { Yotpo, YotpoProduct } = require("@moyarich/yotpo");
const fetch = require("node-fetch");

const yotpoCredentials = {
    ApiKey: process.env.YOTPO_LIVE_APIKEY,
    ApiSecret: process.env.YOTPO_LIVE_APISECRET,
};

const ytpo = new Yotpo(yotpoCredentials, fetch);




# Upload a Product to Yotpo
#---------------------------

async function yotpoAPI() {

  const ytpoProduct = new YotpoProduct(ytpo);

  const productList = {
    return_email_address: "email.example.com",
    result_callback_url: "https://envuzoaboa0440hk.m.pipedream.net",
    products: {
      2380172: {
        name: "Test Rigid Wood",
        url:
          "https://www.example.com/catalog/instruments/hu-friedy-lab-instruments/rigid-wood",
        currency: "USD",
        price: 22,
        group_name: "awsde",
        image_url: "https://www.example.com/photos/products/e18e6550b3c.jpg",
        specs: {
          brand: "Hu-Friedy",
          upc: "",
          mpn: "2LMBGH",
        },
        description: "",
      },
      2380173: {
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

yotpoAPI();



```

