const express = require('express');
const handlebars = require('express-handlebars');
const hbs = require('handlebars');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const { init: initAuth } = require('./auth');
const homeRoute = require('./routes/home');
const productsRoute = require('./routes/products');
const contactRoute = require('./routes/contact');
const sellersRoute = require('./routes/sellers');
const cartRoute = require('./routes/cart');
const usersRoutes = require('./routes/users');

const app = express();
const port = 3002;

// use template engine : handlebars
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));
app.locals.layout = 'default';

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
app.use('/products', productsRoute);
app.use('/', contactRoute);
app.use('/', sellersRoute);
app.use('/', cartRoute);
app.use('/users', usersRoutes);

app.listen(port, () => console.log(`App listening to port ${port}`));