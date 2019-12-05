const mysql = require('mysql');
require('dotenv').config()
console.log(process.env.DB_HOST);

const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: 'jule_et_lily_bdd', // le nom de la base de données
});


module.exports = connection;    