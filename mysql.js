const mysql = require('mysql2');
const env = require("dotenv").config().parsed;

// create the connection to database
const connection = mysql.createConnection({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    database: env.MYSQL_DB,
    password: env.MYSQL_PASSWORD
});


// simple query
// connection.query(
//   'SELECT count(*) as count from `auth` where email = "ssiva@sparkouttech.com"',
//   function(err, results, fields) {
//     console.dir(err);
//     console.log(results[0].count); // results contains rows returned by server
//     //console.log(fields); // fields contains extra meta data about results, if available
//     results.forEach(element => {
//         console.dir(element.username);
//     });
//     }
// );

// console.dir(connection);

module.exports = { connection }