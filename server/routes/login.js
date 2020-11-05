var express = require("express");
var router = express.Router();
var db = require('../model/dbQuery');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('config');
require('dotenv').config();



router.get('/', function (req, res) {
    res.render('login')
});

router.post('/', async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    try {

        if (!username || !password) {
            console.log("error in nothing inserted")
            res.status(401)
            history.push('/')
            res.end();
        } else {
            usernameExists = false;
            var check = await db.checkUserNameExists(username);
            if (check.length === 0) {
                console.log("error in no users")
                res.status(401)
                history.push('/')
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
                            var token = jwt.sign({ id: check[0].id }, config.get('jwtSecret'), { expiresIn: 3600 });
                            res.status(200).send({
                                token: token
                            });
                            res.end()

                        } else {
                            console.log("error in password incorrect")
                            res.status(401)
                            history.push('/')
                            res.end();
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.log("error in catch")
        res.status(401)
        history.push('/')
    }
});


module.exports = router;