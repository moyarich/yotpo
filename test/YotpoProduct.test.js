const chai = require("chai");
const expect = chai.expect;

const fetch = require("node-fetch");

const fetchMock = require("fetch-mock").sandbox();
const mockery = require("mockery");

/*
var nodeFetch = require("node-fetch");
console.log("---previous fetchMock.config", fetchMock.config);

// https://github.com/navio/podcastsuite/blob/1f5805b84884f0d0d706326cb097f979379125e8/PodcastSuite.test.js
Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch,
});
console.log("---after fetchMock.config", fetchMock.config);
*/

//*****************************************************************************
//Yotpo API access files

const { Yotpo, YotpoProduct } = require("@moyarich/yotpo");

const yotpoCredentials = {
  ApiKey: "ExamplegpDgnbqEa0fjhUh1U8Av3w01jz0rSbUJ5Ykq",
  ApiSecret: "ExampleMd1wlvLhFkYM2ZKYDotQRY6ur8inWpobZ0eG",
};

const ytpo = new Yotpo(yotpoCredentials, fetchMock);

ytpoProduct = new YotpoProduct(ytpo);
//*****************************************************************************

describe("Yotpo create_mass_products", () => {
  beforeEach(() => {
    fetchMock.mock("https://api.yotpo.com/oauth/token", {
      access_token: "4g7QdQgbJkWrBctiHgjw3yaNRONVpLbOMJGfH7KH",
      token_type: "bearer",
    });
  });
  afterEach(() => fetchMock.restore());

  it("handles Promise accepted", async () => {
    //trigger valid response
    fetchMock.mock(
      `https://api.yotpo.com/apps/${yotpoCredentials.ApiKey}/products/mass_create`,
      {
        code: 200,
        message: "OK",
        uuid: "eaa959c9-c128-4af2-9b80-92a6ea6170a9",
      },
      { method: "POST" }
    );

    const productData = {};
    let result = await ytpoProduct.create_mass_products(productData);

    expect(result, "Product was not created").to.have.property("message", "OK");

    expect(result)
      .to.not.be.a("Error")
      .with.property("message", "Unexpected token h in JSON at position 0");
  });

  //
  it("`create_mass_products` throws an async error (rejected Promise)", () => {
    /**
     * trigger error
     * @see https://github.com/chaijs/chai/issues/882#issuecomment-322131680
     */
    fetchMock.mock(
      `https://api.yotpo.com/apps/${yotpoCredentials.ApiKey}/products/mass_create`,
      "hi there",
      { method: "POST" }
    );

    const productData = {};
    ytpoProduct.create_mass_products(productData).catch((error) => {
      expect(error)
        .to.be.an("error")
        .with.property("message", "Unexpected token h in JSON at position 0");
    });
  });

  it("`create_mass_products` Simulate server error -  Returns an Error if the response is not in JSON format", () => {
    //trigger error

    fetchMock.mock(
      `https://api.yotpo.com/apps/${yotpoCredentials.ApiKey}/products/mass_create`,
      504,
      { method: "POST" }
    );

    const productData = {};
    ytpoProduct.create_mass_products(productData).catch((error) => {
      console.log("error", error);
      expect(error).to.be.an("error");
    });
  });
});
