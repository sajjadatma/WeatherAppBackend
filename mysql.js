const config = {
    "host" : 'den1.mysql1.gear.host',
    "username": 'weather1',
    "password": 'It6E?i8td1!X',
    "database": 'weather1'
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
