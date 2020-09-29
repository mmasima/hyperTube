const mysql = require('mysql')
const conn = require('./connection')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "000000",
    multipleStatements: true
})

const makeDb = "CREATE DATABASE IF NOT EXISTS Hypertube";

const usersql = "CREATE TABLE IF NOT EXISTS users(\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    username VARCHAR(255) ,\
    name VARCHAR(255),\
    lastname VARCHAR(255),\
    email VARCHAR(255),\
    password VARCHAR(255),\
    token VARCHAR(255),\
    verify VARCHAR(3)\
    )";

const createDB = () => {
    return new Promise((resolve, reject) => {
        connection.query(makeDb,
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.info('Database created');
                return resolve(result[0]);
            });
    });
}


const createTBLs = () => {
    return new Promise((resolve, reject) => {
        conn.query(
            `${usersql};`,
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.info('Tables created');
                return resolve(result[0]);
            });
    });
}

const setupDb = async () => {
    try {
        await createDB();
        await createTBLs();
    } catch (error) {
        console.error(error.message);
    }
}

setupDb();