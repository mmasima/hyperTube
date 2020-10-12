var con = require('./connection');

let Hypertube = {};

Hypertube.insertUserInfo = function (username, name, lastname, email, password, token) {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO users (username, name,lastname,email,password,token,verify) VALUES(?,?,?,?,?,?,?)',
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

Hypertube.findUserByToken = function (token) {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM users WHERE token=? ',
            [token],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                //console.log(result)
                return resolve(result);
            })
    })
}

Hypertube.checkUserNameExists = function (username) {
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
Hypertube.checkEmail = function (email) {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM users WHERE email=? ',
            [email],
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
Hypertube.updateUsername

Hypertube.newToken = function (token, email) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET token=? where email=?`,
            [token, email],
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

Hypertube.checkEmailAndUserNameExist = function (username, email) {
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

//-------------edit Profile start-------//
Hypertube.edituserName = function (username, Id) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET username=? WHERE id=?`,
            [username, Id],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            })
    })

}
Hypertube.EditFirstName = function (name, Id) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET name=? WHERE id=?`,
            [name, Id],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            }
        )
    })
}
Hypertube.EditLastName = function (lastName, Id) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET lastname=? WHERE id=?`,
            [lastName, Id],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            }
        )
    })
}
Hypertube.EditPassword= function (password, Id) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET password=? WHERE id=?`,
            [password, Id],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            }
        )
    })
}
//-------------edit Profile end-------//


module.exports = Hypertube;