const User = require('../models/user');
const Product = require('../models/Product');

module.exports = {
    getAllSellers: async (req, res) => {
        try {
            const sellers = await User.getAllVendeurs();
            const sellersWithProducts = await Promise.all(
                sellers.map(async (seller) => {
                    const products = await Product.getProductsByUser(seller._id);
                    return {
                        ...seller,
                        productsCount: products.length
                    };
                })
            );

            res.render('sellers/index', {
                title: 'Vendeurs',
                sellers: sellersWithProducts,
                user: req.user
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des vendeurs:', error);
            req.flash('error', 'Erreur lors de la récupération des vendeurs');
            res.redirect('/dashboard');
        }
    },

    getSellerById: async (req, res) => {
        try {
            const seller = await User.getUser(req.params.id);
            if (!seller || seller.role !== User.ROLES.VENDEUR) {
                req.flash('error', 'Vendeur non trouvé');
                return res.redirect('/sellers');
            }

            const products = await Product.getProductsByUser(seller._id);
            res.render('sellers/show', {
                title: `Boutique de ${seller.name}`,
                seller,
                products,
                user: req.user
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de la boutique:', error);
            req.flash('error', 'Erreur lors de la récupération de la boutique');
            res.redirect('/sellers');
        }
    },

    manageSellers: async (req, res) => {
        try {
            const pendingSellers = await User.getPendingVendeurs();
            const approvedSellers = await User.getAllVendeurs();
            
            res.render('sellers/manage', {
                title: 'Gestion des vendeurs',
                pendingSellers,
                approvedSellers,
                user: req.user
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des vendeurs:', error);
            req.flash('error', 'Erreur lors de la récupération des vendeurs');
            res.redirect('/dashboard');
        }
    },

    approveSeller: async (req, res) => {
        try {
            await User.approveSeller(req.params.id);
            req.flash('success', 'Vendeur approuvé avec succès');
            res.redirect('/sellers/manage');
        } catch (error) {
            console.error('Erreur lors de l\'approbation du vendeur:', error);
            req.flash('error', 'Erreur lors de l\'approbation du vendeur');
            res.redirect('/sellers/manage');
        }
    },

    rejectSeller: async (req, res) => {
        try {
            await User.rejectSeller(req.params.id);
            req.flash('success', 'Vendeur rejeté avec succès');
            res.redirect('/sellers/manage');
        } catch (error) {
            console.error('Erreur lors du rejet du vendeur:', error);
            req.flash('error', 'Erreur lors du rejet du vendeur');
            res.redirect('/sellers/manage');
        }
    },

    deleteSeller: async (req, res) => {
        try {
            await User.deleteSeller(req.params.id);
            req.flash('success', 'Vendeur supprimé avec succès');
            res.redirect('/sellers/manage');
        } catch (error) {
            console.error('Erreur lors de la suppression du vendeur:', error);
            req.flash('error', 'Erreur lors de la suppression du vendeur');
            res.redirect('/sellers/manage');
        }
    }
};