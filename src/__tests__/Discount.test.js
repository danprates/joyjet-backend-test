const Discount = require('../Discount')

let mockDiscounts, discount

describe('Discounts function', () => {
  beforeEach(() => {
    mockDiscounts = [{ article_id: 2, type: 'amount', value: 25 }, { article_id: 5, type: 'percentage', value: 30 }]
    discount = Discount(mockDiscounts)
  })

  it('should return an object with correct attributes', () => {
    expect(discount).toBeInstanceOf(Object)
    expect(discount).toHaveProperty('getValue')
  })

  it('should return an error when passed incorrect list of discounts', () => {
    expect(() => Discount(null)).toThrow('Incorrect list of discounts')
    expect(() => Discount('incorrect')).toThrow('Incorrect list of discounts')
  })

  describe('getValue function', () => {
    it('should return 0 when the product isnt in the discount list', () => {
      expect(discount.getValue(1, 100)).toEqual(0)
    })

    it('should return the correct amount discount', () => {
      expect(discount.getValue(2, 100)).toEqual(25)
    })

    it('should return the correct percentage discount', () => {
      expect(discount.getValue(5, 100)).toEqual(30)
    })

    it('should return an erro when passed a incorrect article id', () => {
      expect(() => discount.getValue(null, 100)).toThrow('Incorrect article id')
      expect(() => discount.getValue('incorrect', 100)).toThrow()
      expect(() => discount.getValue(-1, 100)).toThrow()
    })

    it('should return erro when passed incorrect value', () => {
      expect(() => discount.getValue(2, null)).toThrow('Incorrect price')
      expect(() => discount.getValue(2, 'incorrect')).toThrow()
      expect(() => discount.getValue(2, -1)).toThrow()
    })
  })
})
