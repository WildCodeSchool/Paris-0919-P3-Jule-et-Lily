const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // address of the server
user :  'louis', // username
password :  'dolfant',
database :  'jule_et_lily_bdd',
});
module.exports = connection;