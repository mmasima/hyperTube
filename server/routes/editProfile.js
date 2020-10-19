 var express = require('express');
var router = express.Router();
var db = require('../model/dbQuery');
var bcrypt = require("bcrypt");
var auth = require('../middleware/auth');
const saltRound = 10;
var id;


router.get('/', auth, function (req, res) {
    console / log(req.decoded);
    id = req.id;
    res.redirect("http://localhost:3000/editProfile");
})

router.post('/', auth, async function (req, res) {
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var confirm = req.body.confirm;
    id = req.id;


    if (username === '' && firstname === '' && lastname === '' && password === '' && confirm === '') {
        res.send(401);
        res.send();
    }
    else {
        if (username != '') {
            var check = await db.checkUserNameExists(username);
            if (check.length == 0) {
                await db.edituserName(username, id);
            }
        }
        if (firstname != '') {
            await db.EditFirstName(firstname, id);
        }
        if (lastname != '') {
            await db.EditFirstName(firstname, id);
        }
        if (password != '' && password === confirm) {
            let newPassword = await bcrypt.hash(password, saltRound);
            await db.EditPassword(newPassword, id)
        }
    }

})

module.exports = router;