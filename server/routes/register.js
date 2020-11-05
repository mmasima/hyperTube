var express = require('express');
var router = express.Router();
var db = require('../model/dbQuery');
var bcrypt = require('bcrypt');
const saltRound = 10;
var crypto = require('crypto');
var nodemailer = require("nodemailer");


router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', async function (req, res) {
    var username = req.body.username
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var confirm = req.body.confirm;

    if (!username || !firstname || !lastname || !email || !password) {
        res.send(401);
        res.end();
    } else {
        emailExists = false;
        usernameExists = false;
        try {
            var check = await db.checkEmailAndUserNameExist(username, email);
            check.forEach(element => {
                if (email == element.email) {
                    emailExists = true;
                    console.log("email exists");
                }
                if (username == element.username) {
                    usernameExists = true;
                    console.log("username exists");
                }
            });
            if (usernameExists == false && emailExists == false) {
                if (password == confirm) {
                    let newPassword = await bcrypt.hash(password, saltRound);
                    var token = crypto.randomBytes(64).toString('base64');
                     await db.insertUserInfo(username, firstname, lastname, email, newPassword, token);
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'wtc.hypertube@gmail.com',
                            pass: 'SimplePassword'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    token = encodeURIComponent(token)

                    var mailOptions = {
                        from: ' Hypertube Devs',
                        to: email,
                        subject: ' HyperTube Activation',
                        text: 'Hello there, please activate your Hypertube account',
                        html: `<p>Hello there, please activate your Hypertube account</p>
                            <a href = 'http://localhost:5000/activateAccount/?token=${token}'>here</a>`
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log("error sending to this email");
                            res.send(401);
                            res.end()
                        } else {
                            res.redirect('/');
                            console.log('Email sent: ' + info.response);
                        }
                    })
                    console.log('inserted')
                    res.send(200);
                    res.end()

                }
            }
            else{
                res.redirect('/')
                res.end();
            }

        } catch (error) {
            console.log(error.message);
            res.redirect('/');
        }
    }
})


module.exports = router;