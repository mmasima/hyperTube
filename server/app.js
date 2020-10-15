
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieSession = require('cookie-session');
var cors = require('cors');
var app = express()
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./config/passport-setup');
require('dotenv').config();


var registerRouter = require('./routes/register')
var forgotPass = require('./routes/forgotPass')
var resetPass = require('./routes/resetPass')
var loginRouter = require('./routes/login')
var activateAcc = require('./routes/activateAccount')
var editProfile = require('./routes/editProfile')
var oauth = require('./routes/ouath')

// view engine setup
app.set('view engine', 'jade');
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  name:'hypertube',
  keys:['keys1', 'keys1']
}))
app.use(passport.initialize());
app.use(passport.session());
// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true
// }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter)
app.use('/login', loginRouter);
app.use('/activateAccount', activateAcc);
app.use('/forgotPass', forgotPass);
app.use('/resetPass', resetPass);
app.use('/editProfile', editProfile);
app.use('/', oauth);


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



app.listen(5000, () => console.log('listening on port ${5000}!'))
module.exports = app
