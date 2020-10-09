var express = require('express');
var router = express.Router();
var db = require('../backend/dbQuery');

router.get('/', function (req, res) {
    res.render('editProfile')
});

router.post('/', async function (req, res) {
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var confirm = req.body.confirm;

    if(!username || !firstname || lastname || password || confirm) {
        res.send(401);
        res.send();
    }
    else{
        if (username != ''){
            var check = await db.checkUserNameExists(username);
            if(check.length == 0){
                
            }
        }
    }

})

module.exports = router;