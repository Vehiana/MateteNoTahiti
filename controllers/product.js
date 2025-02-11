const Product = require('../models/Product');
const User = require('../models/user');

exports.getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('seller');

    if (!product) {
      return res.status(404).render('error', {
        error: 'Produit non trouvé',
        title: 'Erreur'
      });
    }

    res.render('product', {
      product,
      title: product.name_product,
      isAuthenticated: req.session.isLoggedIn,
      currentUser: req.session.user
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).render('error', {
      error: 'Une erreur est survenue lors de la récupération du produit',
      title: 'Erreur'
    });
  }
};