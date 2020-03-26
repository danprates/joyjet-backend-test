const Delivery = require('../Delivery');

let delivery, fees;

describe('Delivery function', () => {
  beforeEach(() => {
    fees = [
      {
        eligible_transaction_volume: { min_price: 0, max_price: 1000 },
        price: 800,
      },
      {
        eligible_transaction_volume: { min_price: 2000, max_price: null },
        price: 0,
      },
    ];

    delivery = Delivery(fees);
  });

  it('should return a object with correct attributes', () => {
    expect(delivery).toBeInstanceOf(Object);
    expect(delivery).toHaveProperty('getPrice');
  });

  it('should return an error when passed a incorrect list of fees', () => {
    expect(() => Delivery(null)).toThrow('Incorrect fees');
    expect(() => Delivery('incorrect')).toThrow();
  });

  describe('getPrice function', () => {
    it('should return an error when passed a incorrect value', () => {
      expect(() => delivery.getPrice(null)).toThrow('Incorrect value');
      expect(() => delivery.getPrice('incorrect')).toThrow();
      expect(() => delivery.getPrice(-1)).toThrow();
      expect(() => delivery.getPrice()).toThrow();
    });

    it('should return a correct value when passed correct params', () => {
      expect(delivery.getPrice(100)).toEqual(800);
    });

    it('should return a correct price when passed a value that exceeds the range limit', () => {
      expect(delivery.getPrice(3000)).toEqual(0);
    });
  });
});
