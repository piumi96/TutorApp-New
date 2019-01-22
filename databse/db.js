const mysql = require('mysql');
const keys = require('../config/keys');

const con = mysql.createConnection({
    host: keys.localdb.host,
    user: keys.localdb.user,
    password: keys.localdb.password,
    database: keys.localdb.database
});

module.exports = con;
