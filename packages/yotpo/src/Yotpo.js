const EventEmitter = require("events");

/**
 * Used to Authenticate and connect to the Yopto API
 * @see {@link https://apidocs.yotpo.com/reference
 * @class
 * Inherit from EventEmitter.
 *
 * @inherits NodeJS EventEmitter http://nodejs.org/api/events.html#events_class_events_eventemitter
 * @event `error`: Emitted when there is an error in the document
 *

 *
 */
class Yopto extends EventEmitter {
  /**
   * @constructor
   * @param {Object} options
   * @param {string} [options.rootUrl = https://api.yotpo.com/]  The main url to Yopto's API
   * @param {string} options.ApiKey   The API key needed to access Yopto's resources
   * @param {string} options.ApiSecret The Api Secret of the Yopto account
   * @param {Object} fetch A fetch Object like node-fetch or window.fetch
   */
  constructor(options = {}, fetch) {
    if (typeof fetch !== "function")
      throw new Error(
        `Please pass a valid fetch api as the second parameter.\nFor example "node-fetch" or the native "window.fetch" object\n`
      );

    super();

    this.version = options.version || "v1";
    this.rootUrl = options.rootUrl || `https://api.yotpo.com/`;
    this.ApiKey = options.ApiKey || "";
    this.ApiSecret = options.ApiSecret || "";
    this.response = { status: null, body: null };

    this.fetch = fetch;

    this.on("error", (err) => {
      throw err;
    });
  }

  /**
   * Retrieves an oauth bearer token from Yotpo
   *
   **/
  get_oauth_token() {
    const url = `${this.rootUrl}oauth/token`;

    /** 
    client_id {string} required Also referred to access API key. See the note below.
    client_secret {string} required Also referred to as API secret. See the note below.
    grant_type {string} required Must be client_credentials.
    @see https://apidocs.yotpo.com/reference?#yotpo-authentication
    */

    const request = {
      client_id: this.ApiKey,
      client_secret: this.ApiSecret,
      grant_type: "client_credentials",
    };

    const options = {
      method: "POST",
      body: JSON.stringify(request),
    };

    return this.get_data(url, options)
      .then(async (json) => {
        if (!json.access_token) {
          return Promise.reject(json);
        }
        return json;
      })
      .catch((error) => {
        error.error_message =
          "There was an error getting the Yotpo token. Please check your API details.";

        throw error;
      });
  }

  /**
   * Fetch resources from the Yopto API
   * @param  {string} url     The Yopto API url to access
   * @param  {Object} options The options to pass to the header
   * @param {string} [options.method = GET]  The http method used access specified Yopto resources. acepptable values : GET, POST, PUT, DELETE
   * @return {Promise}        The promise resolves to a JSON Array or JSON object of the results from the API
   */

  get_data(url, options = {}) {
    const initObject = Object.assign(
      {
        method: "GET",
        headers: Object.assign(
          {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Charset": "utf-8",
          },
          options.headers || {}
        ),
      },
      options
    );

    return this.fetch(url, initObject)
      .then((res) => {
        return res.text().then((responseText) => {
          /**
           * Catching an error produced by fetch here because whenever an error is caused by a
           * server failure, the error message is a string instead of JSON.
           * Wrapping the error as JSON and setting a custom error type so that the app doesnt crash
           * and the error type can be used by another app to resend the request to Yotpo at a later time
           *
           * Example server error: 504 (Gateway Timeout)
           */
          try {
            const data = JSON.parse(responseText);
            const response = { status: res.status, body: data };
            return Promise.resolve(response);
          } catch (error) {
            Object.assign(
              error,
              { invalidResponse: responseText },
              {
                name: error.name,
                message: error.message,
                stack: error.stack,
                error_type: "Exceptions::InvalidJSON",
                status: res.status,
                statusText: res.statusText,
                url,
              }
            );
            return Promise.reject(error);
          }
        });
      })
      .then((resObj) => {
        this.response = resObj;
        return resObj.body;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = Yopto;
