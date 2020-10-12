var express = require('express');
var router = express.Router();
var db = require('../backend/dbQuery');
var bcrypt = require("bcrypt");
const saltRound = 10;

router.get('/', function (req, res) {
    res.render('editProfile')
    console.log("hello world");
    console.log(req.session.GetId);
});

router.post('/', async function (req, res) {
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var confirm = req.body.confirm;

    console.log("hello world!!");
    console.log(req.session.GetId);

    if (username == '' && firstname == 'Choose...' && lastname == '' && password == '') {
        res.send(401);
        res.send();
    }
    else {
        if (username != '') {
            var check = await db.checkUserNameExists(username);
            if (check.length == 0) {
                await db.edituserName(username, req.session.GetId);
            }
            if (firstname != '') {
                await db.EditFirstName(firstname, req.session.GetId);
            }
            if (lastname != '') {
                await db.EditFirstName(firstname, req.session.GetId);
            }
            if (password != '' && password === confirm) {
                let newPassword = await bcrypt.hash(password, saltRound);
                await db.EditPassword(newPassword, req.session.GetId)
            }
        }
    }

})

module.exports = router;