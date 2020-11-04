const express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('config');
const passport = require('passport');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser')

require('../config/passport-setup');
require('dotenv').config();


const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

// Initializes passport and passport sessions
router.use(passport.initialize());
router.use(passport.session());

// Example protected and unprotected routes
router.get('/', (req, res) => res.send('Example Home page!'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    var token = jwt.sign({ id: req.user.displayName }, config.get('jwtSecret'), { expiresIn: 3600 });
    router.use(cookieParser());
    router.use(cookieSession({
      name:'hypertube',
      keys: token
    }))
    res.redirect('http://localhost:3000/mainPage')
  }
);

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})
module.exports = router