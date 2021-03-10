const EventEmitter = require("events");
const querystring = require("querystring");

/**
 * Provides access to the Product endpoint
 * @param {Yotpo} Yotpo The Yotpo object used to Authenticate and connect to the Yotpo API
 *
 * @inherits NodeJS EventEmitter http://nodejs.org/api/events.html#events_class_events_eventemitter
 * @event `error`: Emitted when there is an error in the document
 */
class YotpoProduct extends EventEmitter {
  constructor(Yotpo) {
    super();
    this.Yotpo = Yotpo;

    this.StatusCode = {
      CallAborted: 400, // A previous call to create or update products is still in progress
      AccessDenied: 401,
      OK: 200,
    };

    this.on("error", (err) => {
      throw err;
    });
  }

  /**
   * Get the resource URI to access Yotpo's products
   * @param {boolean} versionedUrl Some product endpoints require a version path in the endpoint URL. Default True
   */
  getAppURI(versionedUrl = true) {
    const app_key = this.Yotpo.ApiKey;
    const app_version = versionedUrl ? this.Yotpo.version + "/" : "";

    return `${this.Yotpo.rootUrl}${app_version}apps/${app_key}/products/`;
  }

  /**
   * Get the resource URI to access Yotpo's products
   * @param {boolean} versionedUrl Some product endpoints require a version path in the endpoint URL. Default True
   */
  getWidgetURI(versionedUrl = true) {
    const app_key = this.Yotpo.ApiKey;
    const app_version = versionedUrl ? this.Yotpo.version + "/" : "";

    return `${this.Yotpo.rootUrl}${app_version}widget/${app_key}/products/`;
  }

  /**
   * Mass create new products, groups, and tags within your product catalog.
   * Note: Only one Create/Update mass products call can be executed at a time. Please wait until one call is completed before sending another request to create or update a products.
   * To get an update once each request is completed, make sure to specify a request_callback_url or return_email address.
   *
   * @param {Object} request The data to send
   *
   * @return Promise with resolve promise result
   * {
   *   code: 200,
   *   message: "OK",
   *   uuid: "6c2f75d0-d779-41db-839c-262d0da7f8fa",
   * }
   * @see https://apidocs.yotpo.com/reference#create-mass-products
   */
  create_mass_products(request) {
    const url = `${this.getAppURI(false)}mass_create`;

    return this.Yotpo.get_oauth_token()
      .then(async (json) => {
        try {
          const oauth_token_info = json.access_token;

          request = Object.assign(
            {
              utoken: oauth_token_info,
            },
            request || {}
          );

          const options = {
            method: "POST",
            body: JSON.stringify(request),
          };

          return this.Yotpo.get_data(url, options);
        } catch (e) {
          this.emit("error", e);
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * mass update new products, groups, and tags within your product catalog.
   * Note: Only one create/Update mass products call can be executed at a time.
   * Please wait until one call is completed before sending another request to update or update a products.
   * To get an update once each request is completed, make sure to specify a request_callback_url or return_email address.
   *
   * @param {Object} request The data to send
   *
   * @return Promise containing result
   * {
   *   code: 200,
   *   message: "OK",
   *   uuid: "6c2f75d0-d779-41db-839c-262d0da7f8fa",
   * }
   *
   * @see https://apidocs.yotpo.com/reference#update-mass-products
   */
  update_mass_products(request) {
    const url = `${this.getAppURI(false)}mass_update`;

    return this.Yotpo.get_oauth_token()
      .then(async (json) => {
        try {
          const oauth_token_info = json.access_token;

          request = Object.assign(
            {
              utoken: oauth_token_info,
            },
            request || {}
          );

          const options = {
            method: "POST",
            body: JSON.stringify(request),
          };

          return this.Yotpo.get_data(url, options);
        } catch (e) {
          this.emit("error", e);
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieve All Products
   *
   * Use this endpoint to retrieves a list of all of your store's products.
   * By default, this endpoint will return the first 10 products in the product catalog.
   * Use the count and page query parameters to retrieve more than 10 products in a paginated response.

   *
   * @param {Object} queryParm
   * @param {string} utoken Your Yotpo account access token. Do not add this, the application will autogenerate the utoken.
   * @param {number} count The amount of products to return per page. Maximum 100 per page.
   * @param {number} page The page number of the paginated response. default 1
   *
   * e.g. https://api.yotpo.com/v1/apps/YOUR_APP_KEY/products?utoken=YOUR_UTOKEN&page=1&count=100
   * @see https://apidocs.yotpo.com/reference#retrieve-all-products
   *    
   */
  retrieve_all_products(queryParm = {}) {
    return this.Yotpo.get_oauth_token().then(async (json) => {
      try {
        const oauth_token_info = json.access_token;

        //autogenerate the utoken, add it the query parameters
        Object.assign(queryParm, { utoken: oauth_token_info });

        let parm = querystring.stringify(queryParm);
        parm = parm ? `?${parm}` : "";

        const url = `${this.getAppURI(true)}${parm}`;

        return this.Yotpo.get_data(url);
      } catch (e) {
        this.emit("error", e);
      }
    });
  }
}
module.exports = YotpoProduct;
