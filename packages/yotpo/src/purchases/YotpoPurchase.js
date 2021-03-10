const EventEmitter = require("events");
const querystring = require("querystring");

/**
 * Provides access to the purchases/orders endpoint
 * @class
 * @see https://apidocs.yotpo.com/reference#introduction-to-purchases
 */

class YotpoPurchase extends EventEmitter {
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
   * Get the resource URI to access Yotpo's Orders
   * @param {boolean} versionedUrl An Order endpoints might need a version path in the endpoint's URL. Default False
   */
  getAppURI(versionedUrl = true) {
    const app_key = this.Yotpo.ApiKey;
    const app_version = versionedUrl ? this.Yotpo.version + "/" : "";

    return `${this.Yotpo.rootUrl}${app_version}apps/${app_key}/purchases/`;
  }

  /**
   * Create an Order within the Yotpo System
   * @param {Object} request The data to send
   *
   * @see https://apidocs.yotpo.com/reference#create-an-order-within-the-yotpo-system-metadata
   * ie https://api.yotpo.com/apps/app_key/purchases/
   */
  create_new_purchase(request = {}) {
    const url = `${this.getAppURI(false)}`;

    return this.Yotpo.get_oauth_token().then(async (json) => {
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
        throw e;
      }
    });
  }

  /**
   * @param {Object} request
   * Use this method to mass create orders.
   * Note: Only one Create/Update mass orders call can be executed at a time.
   * Please wait until one call is completed before sending another request to create or update orders.
   *
   * @see https://apidocs.yotpo.com/reference#create-orders-within-the-yotpo-system
   * e.g. https://api.yotpo.com/apps/:app_key/purchases/mass_create.json
   */
  create_mass_purchases(request = {}) {
    const url = `${this.getAppURI(false)}mass_create.json`;

    return this.Yotpo.get_oauth_token().then(async (json) => {
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
        throw e;
      }
    });
  }

  /**
   * Retrieve Orders from the Yotpo System
   *
   * Use this endpoint to retrieves a list of all of your store's orders.

   * Note:
   * 
   * This call will return a total of ten orders by default. To retrieve more than ten orders, query the count parameter to return the desired quantity of orders. Yotpo recommends querying 200 orders per request.
   * Note:
   * 
   * In the response, "total_purchases" represents the total number of existing orders while 
   * "total_orders" represents the total number of orders returned per call as defined using the count parameter. By default, total_orders will return 10 orders if the count parameter is excluded.
   * 
   * e.g.
   * "total_purchases": 1278421,
   * "total_orders": 10
   * 
   *
   * @param {Object} queryParm
   * @param {string} utoken Your Yotpo account access token. Do not add this, the application will autogenerate the utoken.
   * @param {number} count Number of orders to return. By default, ten orders are displayed.
   * @param {number} page The page number of the paginated response. default 1
   * @param {string} since_id The ID from which to start getting the elements
   * @param {string} since_date Retrieve all orders created starting from this date. The date format is YYYY-MM-DD.
   *
   * @see https://apidocs.yotpo.com/reference#retrieve-orders-from-the-yotpo-system
   * e.g. https://api.yotpo.com/apps/YOUR_APP_KEY/purchase?utoken=YOUR_UTOKEN&page=1&count=10
   */

  retrieve_all_purchase(queryParm = {}) {
    return this.Yotpo.get_oauth_token().then(async (json) => {
      try {
        const oauth_token_info = json.access_token;

        //autogenerate the utoken, add it the query parameters
        Object.assign(queryParm, { utoken: oauth_token_info });

        let parm = querystring.stringify(queryParm);
        parm = parm ? `?${parm}` : "";

        const url = `${this.getAppURI(false)}${parm}`;

        return this.Yotpo.get_data(url);
      } catch (e) {
        throw e;
      }
    });
  }

  /***
   * Delete/Invalidate a Purchases
   * @param {Object} request
   * @param {string} utoken Your Yotpo account access token. Do not add this, the application will autogenerate the utoken.
   * @param {Object} orders object
   * @param {string} orders.order_id The order ID
   * @param {string} orders.sku An array of Product ID's such as SKU's to delete from the order
   *
   *
   *  {
   *    platform: "general",
   *    utoken: "dfgfihoiodifhoefho",
   *    orders: [
   *      {
   *        order_id: "8720999",
   *        skus: ["3660543","3660544"],
   *      },
   *      {
   *        order_id: "8830349",
   *        skus: ["3770547","3770548"],
   *      }
   *    ],
   *  }
   * @see https://apidocs.yotpo.com/reference#invalidate-an-order
   */

  invalidate_order(request = {}) {
    const url = `${this.getAppURI(false)}${parm}`;

    return this.Yotpo.get_oauth_token().then(async (json) => {
      try {
        const oauth_token_info = json.access_token;

        request = Object.assign(
          {
            platform: "general",
            utoken: oauth_token_info,
          },
          request || {}
        );

        const options = {
          method: "DELETE",
          body: JSON.stringify(request),
        };

        return this.Yotpo.get_data(url, options);
      } catch (e) {
        throw e;
      }
    });
  }
}
module.exports = YotpoPurchase;
