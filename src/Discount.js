/**
 * @name Discounts
 * @module
 * @description This function will return an object that contains a list of discounts
 * @param {Array} discounts - The list of discounts
 * @returns {Object} The full object
 * @throws {Error} Will return an error when passed a incorrect array of discounts
 */
module.exports = (discounts) => {
  if (!discounts || !Array.isArray(discounts)) {
    throw new Error('Incorrect list of discounts');
  }

  /**
   * @name getValue
   * @function
   * @description This function will return the value of discount
   * @param {Number} articleId The id of article
   * @param {Number} price The price of article
   * @throws {Error} Will throw an error when passed incorrect articleId ou price
   */
  const getValue = (articleId, price) => {
    if (!articleId || typeof articleId !== 'number' || articleId < 0) {
      throw new Error('Incorrect article id');
    }

    if (!price || typeof price !== 'number' || price < 0) {
      throw new Error('Incorrect price');
    }

    const discount = discounts.find((d) => d.article_id === articleId);

    if (!discount) {
      return 0;
    }

    return discount.type === 'amount'
      ? discount.value
      : price * (discount.value / 100);
  };

  return { getValue };
};
