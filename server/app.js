
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieSession = require('cookie-session');
const passport =require('passport');
const passportLocal = require('passport-Local').Strategy;
var cors = require('cors');
var app = express()
var jwt = require('jsonwebtoken');
require('dotenv').config(); 

var registerRouter = require('./routes/register')
var forgotPass = require('./routes/forgotPass')
var resetPass = require('./routes/resetPass')
var loginRouter = require('./routes/login')
var activateAcc = require('./routes/activateAccount')
var editProfile = require('./routes/editProfile')

//authenticate token

// view engine setup
app.set('view engine', 'jade');
app.use(cors({
  origin: "http://localhost:3000",
  Credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter)
app.use('/login', loginRouter);
app.use('/activateAccount', activateAcc);
app.use('/forgotPass', forgotPass);
app.use('/resetPass', resetPass);
app.use('/editProfile', editProfile);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app
