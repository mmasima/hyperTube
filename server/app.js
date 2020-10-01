
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
var cookieSession = require('cookie-session');
var cors = require('cors');
const app = express()


const registerRouter = require('./routes/register')
// const usersRouter = require('./routes/users')
// const frgotpsswrdRouter = require('./routes/frgotpsswrd')
// const passwordRouter = require('./routes/pssword')
// const homeRouter = require('./routes/homepage')
// const profileRouter = require('./routes/profile')
const loginRouter = require('./routes/login')
const activateAcc = require('./routes/activateAccount')
// const updateProfile = require('./routes/updateProfile')
// const logoutRouter = require('./routes/logout')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

// app.use(cookieSession({
//   maxAge:24*60*60*1000,
//   keys: [key.session.cookieKey]
// }))

const sessionFunction = function(req, res, next){
    if (req.session.login){
      console.log('Welcome back,' + req.session.username+ '!');
      next()
    }else{
      console.log('please login to view this page');
      req.flash('message', 'please login to view this page');
      res.redirect('http://localhost:3000/');
    }
  }
  // view engine setup



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter)
app.use('/login', loginRouter);
app.use('/activateAccount', activateAcc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app
