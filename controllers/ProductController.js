const Product = require('../models/Product');

module.exports = {
  index: async (req, res) => {
    Product.getProducts().then(function (products) {
      console.log('[ProductController] index: render products/index.hbs with ' + products.length + ' products');
      res.render('products/index', { name: req.product.name, products: products });
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.render('products/index', { name: req.product.name, message: err });
    });
  },

  create: async (req, res) => {
    res.render('products/create', { name: req.product.name });
  },

  store: async (req, res) => {
    console.log("[ProductController] store: req=", req.body);

    Product.addProduct(req.body).then(function (res2) {
      res.redirect('/products');
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/products'); // TODO msg
    });
  },

  edit: async (req, res) => {
    console.log("[ProductController] edit: req=", req.params);

    Product.getProduct(req.params.id).then(function (product) {
      res.render('products/edit', { name: req.product.name, product: product });
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.render('products/index', { name: req.product.name, message: err });  // TODO msg
    });
    
  },

  update: async (req, res) => {
    console.log("[ProductController] update: req=", req.body);

    Product.updateProduct(req.body).then(function (res2) {
      res.redirect('/products');
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/products'); // TODO msg
    });
  },

  destroy: async (req, res) => {
    console.log("[ProductController] destroy: req=", req.body);

    Product.delProduct(req.body.id).then(function (res2) {
      res.redirect('/products');
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/products'); // TODO msg
    });
  }
}