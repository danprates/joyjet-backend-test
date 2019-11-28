/**
 * @name Cart
 * @description This function makes the cart instance
 * @param {Array} articles - A list of articles
 * @returns {Object} The cart instance
 * @throws {Error} Will throw an error if the list of articles is incorrect
 */
module.exports = (articles) => {
  if (!articles || !Array.isArray(articles)) { throw new Error('Incorrect list of Articles') }

  /**
   * @name checkout
   * @description This method will sum this cart's total cost
   * @param {Number} id - The ID of the cart
   * @param {Array} items - The list of articles
   * @return {Object} The id and total
   * @throws {Error} Will throw an error if ID or items is incorrect
   * @throws {Error} Will throw an error when one article is not found
   */
  const checkout = (id, items) => {
    if (!id || typeof id !== 'number' || id < 1) { throw new Error('Incorrect ID') }

    if (!items || !Array.isArray(items)) { throw new Error('Incorrect list of items') }

    const total = items
      .map(item => {
        const article = articles.find(art => art.id === item.article_id)

        if (!article) { throw new Error('Article not found') }

        return article.price * item.quantity
      })
      .reduce((acc, cur) => acc + cur, 0)

    return { id, total }
  }

  return {
    checkout
  }
}
