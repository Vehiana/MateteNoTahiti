const Product = require('../models/Product');

module.exports = {
  index: async (req, res) => {
    try {
      let products;
      if (req.user.email === 'admin@cnam.pf') {
        // L'utilisateur admin a accès à tous les produits
        products = await Product.getProducts();
      } else {
        // Les autres utilisateurs voient uniquement leurs produits
        products = await Product.getProducts(req.user.id);
      }

      console.log('[ProductController] index: render products/index.hbs with ' + products.length + ' products');
      res.render('products/index', { name: req.user.name, products });
    } catch (err) {
      console.error('[ERROR] ' + err);
      res.render('products/index', { name: req.user.name, products: [], message: err.message });
    }
  },

  create: async (req, res) => {
    res.render('products/create', { name: req.user.name });
  },

  store: async (req, res) => {
    try {
      // Ajouter l'user_id du créateur au produit
      const productData = { ...req.body, user_id: req.user.id };
      const result = await Product.addProduct(productData);

      console.log('[ProductController] store: Product added with id ' + result.id);
      res.redirect('/products');
    } catch (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/products'); // Afficher un message d'erreur si nécessaire
    }
  },

  edit: async (req, res) => {
    try {
      const product = await Product.getProduct(req.params.id);

      // Vérifier si l'utilisateur peut modifier ce produit
      if (product.user_id !== req.user.id && req.user.email !== 'admin@cnam.pf') {
        console.error('[ProductController] edit: Unauthorized access');
        return res.status(403).send('Unauthorized');
      }

      res.render('products/edit', { name: req.user.name, product });
    } catch (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/products'); // Afficher un message d'erreur si nécessaire
    }
  },

  update: async (req, res) => {
    try {
      const product = await Product.getProduct(req.body.id);

      // Vérifier si l'utilisateur peut modifier ce produit
      if (product.user_id !== req.user.id && req.user.email !== 'admin@cnam.pf') {
        console.error('[ProductController] update: Unauthorized access');
        return res.status(403).send('Unauthorized');
      }

      await Product.updateProduct(req.body);
      console.log('[ProductController] update: Product updated with id ' + req.body.id);
      res.redirect('/products');
    } catch (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/products'); // Afficher un message d'erreur si nécessaire
    }
  },

  destroy: async (req, res) => {
    try {
      const product = await Product.getProduct(req.body.id);

      // Vérifier si l'utilisateur peut supprimer ce produit
      if (product.user_id !== req.user.id && req.user.email !== 'admin@cnam.pf') {
        console.error('[ProductController] destroy: Unauthorized access');
        return res.status(403).send('Unauthorized');
      }

      await Product.delProduct(req.body.id);
      console.log('[ProductController] destroy: Product deleted with id ' + req.body.id);
      res.redirect('/products');
    } catch (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/products'); // Afficher un message d'erreur si nécessaire
    }
  }
};