const cartItems = require('../models/cartItems.json')

module.exports = {
  cartView: (req, res) => {
    res.render('cart', { cartItems: cartItems });
  }
}