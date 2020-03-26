/**
 * @name Delivery
 * @module
 * @description This function will return an object that contains a list of delivery fees
 * @param {Array} fees The list of delivery fees
 * @returns {Object} The full object
 * @throws {Error} Will throw an error when is passed a incorrect array of fees
 */
module.exports = (fees) => {
  if (!fees || !Array.isArray(fees)) {
    throw new Error('Incorrect fees');
  }

  /**
   * @name getPrice
   * @function
   * @description This method will return the value of delivery based on cart's price
   * @param {Number} value The cart's price
   * @returns {Number} The value of delivery
   * @throws {Error} Will throw an error when the value param is invalid
   */
  const getPrice = (value) => {
    if (!value || typeof value !== 'number' || value < 0) {
      throw new Error('Incorrect value');
    }

    const result = fees.find(
      ({ eligible_transaction_volume }) =>
        value >= eligible_transaction_volume.min_price &&
        value <= eligible_transaction_volume.max_price,
    );

    return result ? result.price : 0;
  };

  return { getPrice };
};
