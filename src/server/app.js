const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bravo',
  password: process.env.DB_PASSWORD,
}).promise();

module.exports = conn
