var express = require('express');
var router = express.Router();
var db = require('../model/dbQuery');
var auth = require('../middleware/auth');
var upload = require('../middleware/imageUpload');
var multer = require('multer');
var id;

router.get('/', auth, function (req, res) {
    console / log(req.decoded);
    id = req.id;
    res.redirect("http://localhost:3000/editProfile");
})

router.post('/', auth, async function (req, res) {
    id = req.id;
    console.log("hello world");
    console.log(id);
    upload(req, res, async (err) => {
        
        console.log(req.file);
        if (err instanceof multer.MulterError) {
            res.status(500).send()
        } else if (err) {
            res.status(500).send(err);
        } else {
            var image = req.file;
            console.log("in the image ", id);
            await db.uploadImage(image.filename, id)
            r
            es.status(200).send()
        }
    })
})

module.exports = router;