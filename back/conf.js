const mysql = require('mysql');
require('dotenv').config(process.cwd(), '.env')

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'jule_et_lily_bdd',
});

module.exports = connection;    