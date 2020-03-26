const Cart = require('../Cart');

let mockArticles, mockDelivery, mockArticle, mockItems, cart, mockDiscount;

describe('Cart function', () => {
  beforeEach(() => {
    mockItems = [
      { article_id: 1, quantity: 2 },
      { article_id: 2, quantity: 3 },
    ];

    mockArticle = { id: 1, name: 'water', price: 100 };

    mockArticles = { findById: jest.fn(() => mockArticle) };

    mockDelivery = { getPrice: jest.fn(() => 200) };

    mockDiscount = { getValue: jest.fn(() => 10) };

    cart = Cart(mockArticles, mockDelivery, mockDiscount);
  });

  it('should return a object with correct attributes', () => {
    expect(cart).toBeInstanceOf(Object);
    expect(cart).toHaveProperty('checkout');
  });

  it('should return an erro when passed an incorrect object of articles', () => {
    expect(() => Cart(null)).toThrow('Incorrect object of Articles');
    expect(() => Cart('incorrect')).toThrow('Incorrect object of Articles');
  });

  describe('Checkout function', () => {
    it('should return a object with correct attributes', () => {
      const result = cart.checkout(1, mockItems);

      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('total');
    });

    it('should passes correct params to methods', () => {
      cart.checkout(1, mockItems);

      expect(mockArticles.findById.mock.calls[0][0]).toEqual(
        mockItems[0].article_id,
      );
      expect(mockArticles.findById.mock.calls.length).toEqual(mockItems.length);

      expect(mockDiscount.getValue.mock.calls[0][0]).toEqual(
        mockItems[0].article_id,
      );
      expect(mockDiscount.getValue.mock.calls[0][1]).toEqual(mockArticle.price);
      expect(mockDiscount.getValue.mock.calls.length).toEqual(mockItems.length);

      expect(mockDelivery.getPrice.mock.calls[0][0]).toEqual(450);
      expect(mockDelivery.getPrice.mock.calls.length).toEqual(1);
    });

    it('should return an erro when passed an incorrect id number', () => {
      expect(() => cart.checkout('incorrect', [])).toThrow('Incorrect ID');
      expect(() => cart.checkout(-1, [])).toThrow();
      expect(() => cart.checkout(null, [])).toThrow();
    });

    it('should return an erro when passed an incorrect list of items', () => {
      expect(() => cart.checkout(1, null)).toThrow('Incorrect list of items');
      expect(() => cart.checkout(1, 'incorrect')).toThrow(
        'Incorrect list of items',
      );
    });
  });
});
