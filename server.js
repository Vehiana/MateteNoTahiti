require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const hbs = require('handlebars');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { validationResult } = require('express-validator');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const homeRoute = require('./routes/home');
const productsRoutes = require('./routes/products');
const contactRoute = require('./routes/contact');
const usersRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 3002;

// Security middlewares
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Template engine setup
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'default',
    extname: 'hbs',
    helpers: require('./helpers/handlebars')
}));

// Middleware setup
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'votre_secret_temporaire',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 heures
    }
}));

// Passport configuration
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Request logging middleware
app.use((req, res, next) => {
    logger.info({
        method: req.method,
        path: req.path,
        ip: req.ip
    });
    next();
});

// Make user available to all templates
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Routes
app.use('/', homeRoute);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/products', productsRoutes);
app.use('/contact', contactRoute);
app.use('/users', usersRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Page non trouvée',
        message: 'La page que vous recherchez n\'existe pas.'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});