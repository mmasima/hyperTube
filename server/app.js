
const express = require('express')
const mysql = require('mysql')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = 5000

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const frgotpsswrdRouter = require('./routes/frgotpsswrd')
const passwordRouter = require('./routes/pssword')
const homeRouter = require('./routes/homepage')
const profileRouter = require('./routes/profile')
const loginRouter = require('./routes/login')
const activateAcc = require('./routes/activateAccount')
const updateProfile = require('./routes/updateProfile')
const logoutRouter = require('./routes/logout')

const sessionFunction = function(req, res, next){
    if (req.session.login){
      console.log('Welcome back,' + req.session.username+ '!');
      next()
    }else{
      console.log('please login to view this page');
      req.flash('message', 'please login to view this page');
      res.redirect('http://localhost:3000/login');
    }
  }

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app
