// TODO: Documentation
/**
 *
 * @param {*} ytpoProduct
 * @param {*} productList
 * The Default action is to create a product
 * productList should contain a type to direct the update to the correct endpoint.
 * old products are updated
 * and new products are created
 *
 * productList{
 *    "type": "product-upload"
 * }
 *
 * @see https://apidocs.yotpo.com/reference#create-mass-products
 * @see https://apidocs.yotpo.com/reference#update-mass-products
 */

async function uploadYotpoProductFeed(ytpoProduct, productList) {
  /** Expected Response from Yotpo
   *
   *  {
   *     "code": 200,
   *     "message": "OK",
   *     "uuid": "9a7b9b6a-604e-4f0f-bab3-186cddd990fe"
   * }
   */
  let response;
  if (productList.type == "product-upload") {
    response = await ytpoProduct.update_mass_products(productList);
  } else {
    response = await ytpoProduct.create_mass_products(productList);
  }

  let status;
  switch (response.code) {
    case ytpoProduct.StatusCode.OK:
      status = "Succeeded";
      break;
    case ytpoProduct.StatusCode.AccessDenied:
    case ytpoProduct.StatusCode.CallAborted:
    default:
      status = "Failed";

      const err = new Error(
        "Yotpo's server reported either an access denied or call aborted issue"
      );
      Object.assign(err, { status, response });
      throw err;
      break;
  }

  return { status, response };
}

module.exports = uploadYotpoProductFeed;
