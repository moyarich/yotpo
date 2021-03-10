const EventEmitter = require("events");
const querystring = require("querystring");

/**
 * Provides access to the reviews endpoint
 * @class
 * @see https://apidocs.yotpo.com/reference#introduction-to-reviews
 */

class YotpoReview extends EventEmitter {
  /**
   * @constructor
   * @param {Yotpo} Yotpo The Yotpo object used to Authenticate and connect to the Yotpo API
   */
  constructor(Yotpo) {
    super();
    this.Yotpo = Yotpo;

    this.StatusCode = {
      AccessDenied: 401,
      OK: 200,
    };

    this.on("error", (err) => {
      throw err;
    });
  }

  /**
   * Retrieves a list of all of reviews.
   *
   * https://api.yotpo.com/v1/apps/app_key/reviews?utoken=utoken
   */
  retrieve_all_review(queryParm = {}) {
    return this.Yotpo.get_oauth_token().then(async (json) => {
      try {
        const oauth_token_info = json.access_token;

        const defaultParm = {
          page: 1,
          count: 100,
        };

        //autogenerate the utoken, add it the query parameters
        Object.assign(defaultParm, queryParm, { utoken: oauth_token_info });

        let parm = querystring.stringify(queryParm);
        parm = parm ? `?${parm}` : "";

        const app_version = versionedUrl ? this.Yotpo.version + "/" : "";
        const url = `${this.Yotpo.rootUrl}${app_version}apps/${this.Yotpo.ApiKey}/reviews${parm}`;

        return this.Yotpo.get_data(url);
      } catch (e) {
        throw e;
      }
    });
  }

  // TODO: Documentation

  create_review(request = {}) {
    const app_version = versionedUrl ? this.Yotpo.version + "/" : "";
    const url = `${this.Yotpo.rootUrl}${app_version}widget/reviews/`;

    try {
      const oauth_token_info = json.access_token;

      request = Object.assign(
        {
          appkey: this.Yotpo.ApiKey,
          domain: this.domain,
        },
        request || {}
      );

      const options = {
        method: "POST",
        body: JSON.stringify(request),
      };

      return this.Yotpo.get_data(url, options);
    } catch (e) {
      throw e;
    }
  }
}
module.exports = YotpoReview;
