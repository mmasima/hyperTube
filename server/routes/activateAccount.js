var express = require('express');
var router = express.Router();
var db = require('../backend/dbQuery');
var token;


/*get*/
router.get('/', async function (req, res) {
    try {
    
        token = decodeURIComponent(req.query.token);
        if (token) {
            let user = await db.findUserByToken(token);
            user = user[0];
            await db.activateAccount(user.token);
            res.redirect('http://localhost:3000/')
            
        }
        //res.end();
    } catch (error) {
        console.log(error)
    }
});


module.exports = router