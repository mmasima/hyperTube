var jwt = require('jsonwebtoken');
var config = require('config');
require('dotenv').config();

//format of token
function auth(req, res, next) {
    //Get auth Header value
    const token = req.header('x-auth-token');

    //check for token
    if (!token) {
        res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'token is not valid' })
    }

}

module.exports = auth;