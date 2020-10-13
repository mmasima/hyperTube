var jwt = require('jsonwebtoken');
var config = require('config');
require('dotenv').config();

//format of token
function auth(req, res, next) {
    //Get auth Header value
    let token = req.header('x-auth-token');
    //check for token
    if (!token) {
        res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }
    try {
        console.log("hello world 1");
        jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
            if (err) {
              console.log(err)
              return res.status(401).send({
                message: "Unauthorized token"
              });
            }
            else{
                req.id = decoded.id;
                next();
            }
          });
    } catch (e) {
        res.status(400).json({ msg: 'token is not valid' })
    }

}

module.exports = auth;