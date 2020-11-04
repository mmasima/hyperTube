var con = require('./connection');

let hypertube = {};


// register
hypertube.insertUserInfo = function (username, name, lastname, email, password, token) {
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

// register via google

hypertube.googleRegiser = function (username, name, lastname) {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO users (username, name,lastname,verify) VALUES(?,?,?,?)',
            [username, name, lastname, 'yes'],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            })
    })
}


hypertube.findUserByToken = function (token) {
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

hypertube.checkUserNameExists = function (username) {
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
hypertube.checkEmail = function (email) {
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

hypertube.updateUserPassword = function (password, username) {
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
hypertube.updateUsername

hypertube.newToken = function (token, email) {
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

hypertube.activateAccount = function (token) {
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

hypertube.checkEmailAndUserNameExist = function (username, email) {
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

hypertube.uploadImage = async function (image, id) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET image=? WHERE id=?`,
            [image, id],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            })
    })


}

hypertube.edituserName = function (username, Id) {
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
hypertube.EditFirstName = function (name, Id) {
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
hypertube.EditLastName = function (lastName, Id) {
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
hypertube.EditPassword = function (password, Id) {
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

hypertube.Getuser = function (id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users WHERE id=? `,
            [id],
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

hypertube.insertVideoD = function (video_id, title, name, ext, videosize, hash, status) {
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO video (video_id, title, name, ext, videosize, hash, status)
        VALUES(?,?,?,?,?,?,?)`,
            [video_id, title, name, ext, videosize, hash, status],
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            })
    })
}

hypertube.checkvideoExists = function (video_id) {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM video WHERE video_id=? ',
            [video_id],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                //console.log(result)
                return resolve(result);
            })
    })
}

hypertube.Updatevideo = async function (status, video_id) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE video SET status=? WHERE video_id=?`,
            [status, video_id],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result);
                return resolve(result);
            })
    })


}

hypertube.checkvideoname = async function (video_id) {
    return new Promise((resolve, reject) => {
        con.query('SELECT name FROM video WHERE video_id=? ',
            [video_id],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.log(result)
                return resolve(result);
            })
    })
}
//-------------edit Profile end-------//


//-------------comments start-------//

hypertube.comments = function (videoId, comments) {
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO comment(video_id, comment)
        VALUES(?,?)`,
            [videoId, comments],
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            })
    })
}

hypertube.getComments = function (id) {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM comment WHERE video_id=?',
            [id],
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            })
    })
}

//-------------comments end-------/


module.exports = hypertube;