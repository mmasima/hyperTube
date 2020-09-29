var express = require("express");
var router = express.Router();
var con = require('../backend/connection');
var db = require('../backend/dbQuery');
var bcrypt = require('bcrypt');
const e = require("express");


router.get('/', function (req, res) {
    res.render('login', { message: req.flash('message') })
});

router.post('/', async function (req, res) {
    if (req.method == "POST") {
        var username = req.body.username;
        var password = req.body.password;
        var profile_complete = 'no';

        if (!username || !password) {
            res.status("400");
            req.flash('message', 'an error occured');
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
                                req.session.GetId = check[0].id;
                                req.session.user = check[0]
                                usernameExists = true;
                                profile_complete = check[0].profile_complete;
                                verify = check[0].verify;
                            }
                        });
                        if (usernameExists == true && verify == 'yes') {
                            req.session.username = username;
                            req.session.login = true;
                        } else {
                            console.log('activate your account');
                            req.flash('message', 'activate your account');
                            res.redirect('/login');
                            res.end();
                        }
                    }
                });
            }
        }
    }
});


module.exports = router;