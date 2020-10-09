var express = require("express");
var router = express.Router();
var db = require('../backend/dbQuery');
var bcrypt = require('bcrypt');


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
                                req.session.GetId = check[0].id;
                                req.session.user = check[0]
                                verify = check[0].verify;
                            }
                        });
                        if (usernameExists == true && verify == 'yes') {
                            console.log("hello 2");
                            console.log(username);
                            req.session.user = username;
                            res.send(200);
                            res.end()
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