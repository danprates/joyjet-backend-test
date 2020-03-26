/**
 * @name Articles
 * @module
 * @description This function will return an object that contains a list of articles
 * @param {Array} articles - List of articles
 * @returns {Object} The object that contains the list
 * @throws {Error} Will throw an error when passed an incorrect array of articles
 */
module.exports = (articles) => {
  if (!articles || !Array.isArray(articles)) {
    throw new Error('Incorrect list of articles');
  }

  /**
   * @name findById
   * @function
   * @description This function will return an article from the list of articles
   * @param {Number} id - The id of article
   * @returns {Object} The founded article
   * @throws {Error} Will throw an error when id is incorrect
   * @throws {Error} Will throw an error when the article is not found
   */
  const findById = (id) => {
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new Error('Incorrect article id');
    }

    const article = articles.find((a) => a.id === id);

    if (!article) {
      throw new Error('Article not found');
    }

    return article;
  };

  return { findById };
};
