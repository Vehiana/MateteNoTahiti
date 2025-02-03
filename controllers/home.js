const Product = require('../models/Product');

exports.getHomePage = async (req, res) => {
  try {
    const products = await Product.getProducts();
    
    // Sélectionner les 6 derniers produits ajoutés
    const latestProducts = products.slice(-5).reverse();

    res.render('home', { products: latestProducts });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).send('Erreur serveur');
  }
};