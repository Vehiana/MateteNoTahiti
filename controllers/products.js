const products = require('../models/products.json');

module.exports = {
  productsView: (req, res) => {
    res.render('products', { products: products });
  }
}