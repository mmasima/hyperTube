var express = require('express');
var router = express.Router();
var db = require('../model/dbQuery');
const bcrypt = require("bcrypt");
const multer = require('multer');
var auth = require('../middleware/auth');
var upload = require('../middleware/imageUpload');
const saltRound = 10;
var id;


router.get('/', auth, function (req, res) {
    id = req.id;
    res.render('editProfile')
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
        res.send
    }

});

router.post('/updateImage', auth, async function (req, res) {
    upload(req, res, async (err) => {
        id = req.id;
        if (err instanceof multer.MulterError) {  
            res.status(500).send()
        } else if (err) {
            res.status(500).send(err);
        } else {
            console.log("in the image ", id);
            var image = req.file;
            console.log(image);
            await db.uploadImage(image.filename, id)
            res.status(200).send()
        }
    })
})

module.exports = router;