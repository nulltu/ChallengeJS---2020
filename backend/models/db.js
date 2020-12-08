// const mysql = require('mysql');
// const dbConfig = require('../config/dbConfig');

// //Create a connection to the database
// const connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });

// //Open the Mysql connection
// connection.connect(error => {
//     if(error) throw error;
//     console.log("Successfully connected to the database");
// });

// module.exports = connection;


var mysql      = require('mysql');
const dbConfig = require('../config/dbConfig');


var connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });



module.exports = connection;