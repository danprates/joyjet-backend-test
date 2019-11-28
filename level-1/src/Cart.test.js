const Cart = require('./Cart')
const { articles, carts } = require('./data')

describe('Checkout function', () => {
  it('should return a object with id and total attributes', () => {
    const result = Cart(articles).checkout(1, [])

    expect(result).toBeInstanceOf(Object)
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('total')
  })

  it('should return a correct checkout value', () => {
    const result = Cart(articles).checkout(1, carts[0].items)

    expect(result).toEqual({ id: 1, total: 2000 })
  })

  it('should return total equal 0 when passed a empty list of items', () => {
    const result = Cart(articles).checkout(1, [])

    expect(result).toEqual({ id: 1, total: 0 })
  })

  it('should return a correct checkout value when passed a list of carts', () => {
    const { checkout } = Cart(articles)
    const expectedResult = [
      { id: 1, total: 2000 },
      { id: 2, total: 1400 },
      { id: 3, total: 0 }
    ]

    const result = carts.map(cart => checkout(cart.id, cart.items))

    expect(result).toEqual(expectedResult)
  })

  describe('Error handling', () => {
    it('should return an erro when passed an incorrect list of articles', () => {
      expect(() => Cart(null)).toThrow('Incorrect list of Articles')
      expect(() => Cart('incorrect')).toThrow('Incorrect list of Articles')
    })

    it('should return an erro when passed an incorrect id number', () => {
      const { checkout } = Cart(articles)

      expect(() => checkout('incorrect', [])).toThrow('Incorrect ID')
      expect(() => checkout(-1, [])).toThrow()

      expect(() => checkout(null, [])).toThrow()
    })

    it('should return an erro when passed an incorrect list of items', () => {
      const { checkout } = Cart(articles)

      expect(() => checkout(1, null)).toThrow('Incorrect list of items')
      expect(() => checkout(1, 'incorrect')).toThrow('Incorrect list of items')
    })

    it('should return an erro when passed a incorrec article_id', () => {
      carts[0].article_id = 'incorrect'

      const { checkout } = Cart(articles)

      expect(() => checkout(1, carts)).toThrow('Article not found')
    })
  })
})
