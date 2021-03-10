const chai = require("chai");
const expect = chai.expect;

const fetch = require("node-fetch");

//*****************************************************************************
const { Yotpo, YotpoProduct } = require("@moyarich/yotpo");

/**
 * Yotpo API access files
 * This is a live test that uses Yotpo's Sandbox
 */

const ytpo = new Yotpo(
  {
    ApiKey: process.env.YOTPO_APIKEY || "API_KEY_MISSING",
    ApiSecret: process.env.YOTPO_APISECRET || "API_SECRET_MISSING",
  },
  fetch
);

describe("Yotpo create_mass_products", () => {
  it("Should have client key", async () => {
    expect(ytpo.ApiKey, "API client key is missing").to.not.equal(
      "API_KEY_MISSING"
    );
  });

  it("Should have client secret key", async () => {
    expect(ytpo.ApiSecret, "API client secret is missing").to.not.equal(
      "API_SECRET_MISSING"
    );
  });
});
