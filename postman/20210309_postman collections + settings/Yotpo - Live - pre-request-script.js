/**
 * Yotpo Authentication This endpoint uses your Yotpo API Key and API Secret to generate the API utoken necessary to authenticate most of Yotpo's API calls.
 * Note that utokens are invalidated upon logging out of the Yotpo system.
 * As such, we recommend generating a new utoken for every API call.
 *
 * https://apidocs.yotpo.com/reference#yotpo-authentication
 *
 * Sample - pre request script taken from
 *
 * https://gist.github.com/bcnzer/073f0fc0b959928b0ca2b173230c0669
 */

const OauthTokenRequest = {
  url: pm.environment.get("YOTPO_LIVE_API_ROOT_URL") + "oauth/token",
  method: "POST",
  header: "Content-Type:application/json",
  body: {
    mode: "application/json",
    raw: JSON.stringify({
      client_id: pm.environment.get("YOTPO_LIVE_APIKEY"),
      client_secret: pm.environment.get("YOTPO_LIVE_APISECRET"),
      //audience: pm.environment.get('my_audience'),
      grant_type: "client_credentials",
    }),
  },
};

console.log(
  "OauthTokenRequest:\n\n",
  JSON.stringify(OauthTokenRequest, null, 4)
);

pm.sendRequest(OauthTokenRequest, function (err, res) {
  console.log(err ? err : res.json());
  if (err === null) {
    const responseJson = res.json();

    console.log("Saving the Yotpo Bearer token");
    console.log(JSON.stringify(responseJson, null, 4));
    pm.environment.set("YOTPO_LIVE_BEARER_TOKEN", responseJson.access_token);
  }
});
