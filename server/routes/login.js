var express = require("express");
var router = express.Router();
var db = require('../backend/dbQuery');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


router.get('/', function (req, res) {
    res.render('login')
});

router.post('/', async function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            res.send(401);
            res.end();
        } else {
            usernameExists = false;
            var check = await db.checkUserNameExists(username);
            if (check.length == 0) {
                console.log("error logging in with username!")
                res.send(401);
                res.end();
            }
            else {
                bcrypt.compare(password, check[0].password, function (err, result) {
                    if (result == true) {
                        var verify;
                        check.forEach(element => {

                            if (username == element.username) {
                                usernameExists = true;
                                verify = check[0].verify;
                            }
                        });
                        if (usernameExists == true && verify == 'yes') {
                            const user = {name: check};
                            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                            res.json({ accessToken: accessToken })
                            res.send(200);
                        } else {
                            console.log('activate your account');
                            res.redirect('/');
                            res.end();
                        }
                    }
                });
            }
        }
});


module.exports = router;