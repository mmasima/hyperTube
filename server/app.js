
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieSession = require('cookie-session');
var cors = require('cors');
var app = express()


var registerRouter = require('./routes/register')
// varusersRouter = require('./routes/users')
var forgotPass = require('./routes/forgotPass')
var resetPass = require('./routes/resetPass')
// varhomeRouter = require('./routes/homepage')
// varprofileRouter = require('./routes/profile')
var loginRouter = require('./routes/login')
var activateAcc = require('./routes/activateAccount')
// varupdateProfile = require('./routes/updateProfile')
// varlogoutRouter = require('./routes/logout')

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));


// app.use(cookieSession({
//   maxAge:24*60*60*1000,
//   keys: [key.session.cookieKey]
// }))

var sessionFunction = function (req, res, next) {
  if (req.session.login) {
    console.log('Welcome back,' + req.session.username + '!');
    next()
  } else {
    console.log('please login to view this page');
    res.redirect('http://localhost:3000/');
  }
}
// view engine setup


app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter)
app.use('/login', loginRouter);
app.use('/activateAccount', activateAcc);
app.use('forgotPass', forgotPass);
app.use('resetPass', resetPass);


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
