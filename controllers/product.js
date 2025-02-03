const Product = require('../models/Product');

exports.getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.getProduct(productId);

    if (!product) {
      return res.status(404).send('Produit non trouvé');
    }

    res.render('product', { product });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).send('Erreur serveur');
  }
};