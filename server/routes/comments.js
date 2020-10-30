var express = require('express');
var router = express.Router();
var db = require('../model/dbQuery');
var auth = require('../middleware/auth');
var id;

router.get('/', auth, function (req, res) {

})

router.post('/', auth, async function (req, res) {
    try {
        console.log("hello world")
        console.log(req.body.id)
        console.log(req.body.comment)
        var videoId = req.body.id;
        var comment = req.body.comment;
        await db.comments(videoId, comment)
    } catch (error) {
        console.log('error', error);
        res.status(401).send();
    }
    res.status(200).send();
})

router.post('/getComments', auth, async function(req, res) {
    try{
        var comments = await db.getComments(req.id);
    }catch(err){
        console.log('error', error);
        res.status(401).send();
    }
    res.status(200).send(comments);
    return comments;
})

module.exports = router