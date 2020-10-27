const mysql = require('mysql')
const con = require('./connection')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "000000",
    multipleStatements: true
})

const makeDb = "CREATE DATABASE IF NOT EXISTS Hypertube";

const users = "CREATE TABLE IF NOT EXISTS users(\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    username VARCHAR(255) ,\
    name VARCHAR(255),\
    lastname VARCHAR(255),\
    email VARCHAR(255),\
    password VARCHAR(255),\
    image VARCHAR(255),\
    token VARCHAR(255),\
    verify VARCHAR(3)\
    )";

const video = 'CREATE TABLE IF NOT EXISTS video(\
    id int(11) AUTO_INCREMENT PRIMARY KEY, \
    video_id int(11) ,\
    title VARCHAR(255),\
    name VARCHAR(255),\
    ext VARCHAR(255),\
    videosize VARCHAR(255),\
    hash VARCHAR(255),\
    status VARCHAR(255),\
    views int(42) default 0\
    )'

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
        con.query(
            `${users};`,
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                console.info('Tables created');
                return resolve(result[0]);
            });
    });
}

const createTBL = () => {
    return new Promise((resolve, reject) => {
        con.query(
            `${video};`,
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
        await createTBL();
    } catch (error) {
        console.error(error.message);
    }
}

setupDb();