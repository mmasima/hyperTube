var express = require('express');
var router = express.Router();
var db = require('../model/dbQuery');
var auth = require('../middleware/auth');
var id;

router.get('/', auth, function (req, res) {
    res.render('comments');
})

router.post('/', auth, async function (req, res) {
    try {
        var videoId = req.body.id;
        var comment = req.body.comment;
        await db.comments(videoId, comment)
    } catch (error) {
        console.log('error', error);
        res.status(401).send();
    }
    res.status(200).send();
})

router.post('/getComments', auth,  async function(req, res) {
        var id = req.body.id;
        var comments = await db.getComments(id);
        console.log(comments)
        res.status(200).send(comments);
        return comments;
})

module.exports = router