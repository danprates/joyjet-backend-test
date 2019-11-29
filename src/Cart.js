/**
 * @name Cart
 * @module Cart
 * @description This function makes the cart instance
 * @param {Object} articles - A list of articles
 * @param {Object} delivery - A list of delivery fees
 * @param {Object} discount - A list of discount value
 * @returns {Object} The cart instance
 * @throws {Error} Will throw an error if the list of articles is incorrect
 */
module.exports = (articles, delivery, discount) => {
  if (!articles || typeof articles !== 'object') { throw new Error('Incorrect object of Articles') }

  /**
   * @name checkout
   * @function
   * @description This method will sum this cart's total cost
   * @param {Number} id - The ID of the cart
   * @param {Array} items - The list of articles
   * @return {Object} The id and total
   * @throws {Error} Will throw an error if ID or items is incorrect
   */
  const checkout = (id, items) => {
    if (!id || typeof id !== 'number' || id < 1) { throw new Error('Incorrect ID') }

    if (!items || !Array.isArray(items)) { throw new Error('Incorrect list of items') }

    let total = items
      .map(({ article_id, quantity }) => {
        const { price } = articles.findById(article_id)

        const discountValue = discount.getValue(article_id, price)

        return (price - discountValue) * quantity
      })
      .reduce((acc, cur) => acc + cur, 0)

    total += delivery.getPrice(total)

    return { id, total: Math.trunc(total) }
  }

  return { checkout }
}
