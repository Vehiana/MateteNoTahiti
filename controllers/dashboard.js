const User = require('../models/user');
const Product = require('../models/Product');

module.exports = {
    dashboardView: async (req, res) => {
        try {
            const user = req.user;
            let viewData = {
                user,
                title: 'Tableau de bord'
            };

            switch (user.role) {
                case User.ROLES.ADMIN:
                    const [allUsers, allProducts] = await Promise.all([
                        User.getAllUsers(),
                        Product.getProducts()
                    ]);

                    viewData = {
                        ...viewData,
                        usersCount: allUsers.length,
                        sellersCount: allUsers.filter(u => u.role === User.ROLES.VENDEUR).length,
                        productsCount: allProducts.length,
                        recentUsers: allUsers.slice(-5),
                        recentProducts: allProducts.slice(-5)
                    };
                    return res.render('dashboard/admin', viewData);

                case User.ROLES.VENDEUR:
                    const vendeurProducts = await Product.getProductsByUser(user._id);
                    viewData = {
                        ...viewData,
                        productsCount: vendeurProducts.length,
                        salesCount: 0, // À implémenter avec le système de ventes
                        products: vendeurProducts
                    };
                    return res.render('dashboard/vendeur', viewData);

                case User.ROLES.CLIENT:
                default:
                    const [featuredProducts, popularSellers] = await Promise.all([
                        Product.getProducts(),
                        User.getAllVendeurs()
                    ]);

                    viewData = {
                        ...viewData,
                        featuredProducts: featuredProducts.slice(0, 6),
                        popularSellers: popularSellers.slice(0, 4).map(seller => ({
                            ...seller,
                            productsCount: 0 // À calculer avec les produits du vendeur
                        }))
                    };
                    return res.render('dashboard/client', viewData);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du tableau de bord:', error);
            res.status(500).render('error', {
                title: 'Erreur',
                message: 'Une erreur est survenue lors du chargement du tableau de bord'
            });
        }
    }
};