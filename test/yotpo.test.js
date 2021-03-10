const chai = require("chai");
const expect = chai.expect;

//*****************************************************************************

const yotpoCredentials = require("./yotpoCredentials");

describe("Yotpo create_mass_products", () => {
  it("Should have client key for sandbox/test environment", async () => {
    expect(
      yotpoCredentials.ApiKey,
      "Sandbox API client key is missing"
    ).to.not.equal("API_KEY_MISSING");
  });

  it("Should have client secret key for sandbox", async () => {
    expect(
      yotpoCredentials.ApiSecret,
      "Sandbox API client secret is missing"
    ).to.not.equal("API_SECRET_MISSING");
  });
});
