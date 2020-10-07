var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var db = require('../backend/dbQuery');
var nodemailer = require("nodemailer");

router.get('/', function (req, res) {
    res.render('forgotPass');
});

router.post('/', async function (req, res) {
    var email = req.body.email;
    if (!email) {
        res.status("401");
        res.end();
    }
    else {
        emailExist = false;
        try {
            var check = await db.checkEmail(email);
            check.forEach(element => {
                if (email == element.email) {
                    emailExist = true;
                }
            });
            if (emailExist == true) {
                var token = crypto.randomBytes(64).toString('base64');
                 await db.newToken(token, email);
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
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
                    from: 'Hypertube Devs',
                    to: email,
                    subject: 'forgot Password',
                    text: `To reset your password, please click the link below.`,
                    html: `<p>change your password</p>
                            <a href = 'http://localhost:5000/resetPass/?token=${token}&email=${email}'>here</a>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("error sending to email");
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);

                    }
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
})

module.exports = router;