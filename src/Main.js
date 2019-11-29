const data = require('./mocks/data')

const Cart = require('./Cart')
const Delivery = require('./Delivery')
const Discount = require('./Discount')
const Articles = require('./Articles')

const main = () => {
  const articles = Articles(data.articles)
  const delivery = Delivery(data.delivery_fees)
  const discount = Discount(data.discounts)
  const cart = Cart(articles, delivery, discount)

  const carts = data.carts
    .map(openCarts => cart.checkout(openCarts.id, openCarts.items))

  console.log({ carts })
}

main()
