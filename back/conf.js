const mysql = require('mysql');
require('dotenv').config(process.cwd(), '.env')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
});

module.exports = connection;    