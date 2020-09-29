var con = require('./connection');

let Hypertube = {};

Hypertube.insertUserInfo = function (username, name, lastname, email, password, token, verify) {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO users (username, name,lastname,email,password,token) VALUES(?,?,?,?,?,?,?)',
            [username, name, lastname, email, password, token, 'no'],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result)
                return resolve(result);
            })
    })
}

Hypertube.checkUserNameExists = function(username){
    return new Promise((resolve, reject) => {
		con.query('SELECT * FROM users WHERE username=? ',
            [username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			})
	})
}

Hypertube.updateUserPassword = function (password, username) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET password=?,token='' WHERE username =?`,
            [password, username],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            })
    })
}

Hypertube.activateAccount = function (token) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET verify=?,token='' WHERE token =?`,
            ['yes', token],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            })
    })
}

matcha.checkEmailAndUserNameExist = function (username, email) {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM users WHERE username=? OR email=?',
            [username, email],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result)
                return resolve(result);
            })
    })

}

module.exports = Hypertube;