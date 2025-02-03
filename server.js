const express = require('express');
const handlebars = require('express-handlebars');
const hbs = require('handlebars');
const multer = require('multer');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const { init: initAuth } = require('./auth');
const homeRoute = require('./routes/home');
const productsRoutes = require('./routes/products');
const contactRoute = require('./routes/contact');
const sellersRoute = require('./routes/sellers');
const cartRoute = require('./routes/cart');
const usersRoutes = require('./routes/users');
const productRoutes = require('./routes/product');
const app = express();
const port = 3002;

// use template engine : handlebars
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));
app.locals.layout = 'default';

// Définir le stockage des images
const storage = multer.diskStorage({
  destination: './public/images/', // Dossier où stocker les images
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec une date unique
  }
});

// Initialiser Multer
const upload = multer({ storage: storage });

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));
initAuth();
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', homeRoute);
app.use('/products', productsRoutes);
app.use('/', contactRoute);
app.use('/', sellersRoute);
app.use('/', cartRoute);
app.use('/users', usersRoutes);
app.use('/', productRoutes);

app.listen(port, () => console.log(`App listening to port ${port}`));