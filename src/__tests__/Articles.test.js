const Articles = require('../Articles')

let articles, mockArticles

describe('Articles function', () => {
  beforeEach(() => {
    mockArticles = [{ id: 1, name: 'water', price: 100 }, { id: 2, name: 'honey', price: 200 }]
    articles = Articles(mockArticles)
  })

  it('should return an object with correct attributes', () => {
    expect(articles).toBeInstanceOf(Object)
    expect(articles).toHaveProperty('findById')
  })

  it('should return an erro when passed a incorrect list of articles', () => {
    expect(() => Articles(null)).toThrow('Incorrect list of articles')
    expect(() => Articles('incorrect')).toThrow()
  })

  describe('findById function', () => {
    it('should return a correct article object', () => {
      const result = articles.findById(1)

      expect(result).toBeInstanceOf(Object)
      expect(result).toEqual(mockArticles[0])
    })

    it('should return an erro when passed an incorrect id', () => {
      expect(() => articles.findById(null)).toThrow('Incorrect article id')
      expect(() => articles.findById('incorrect')).toThrow('Incorrect article id')
      expect(() => articles.findById(-1)).toThrow('Incorrect article id')
    })

    it('should return an erro when article was not found', () => {
      expect(() => articles.findById(1000)).toThrow('Article not found')
    })
  })
})
