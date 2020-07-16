const config = {
    "host" : '127.0.0.1',
    "username": 'root',
    "password": '',
    "database": 'weather'
};
const mysql = require('mysql');

module.exports.run = function (sql, succeeded, failed) {
    const con = mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database,
        insecureAuth : true,
        multipleStatements: true
    });

    con.query(sql, function (err, result, callback) {
        if (err) con.end(failed(err));
        else con.end(succeeded(result));
    });


};