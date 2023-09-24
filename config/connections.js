const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'luckydog',
  database: 'acme_db'
});

module.exports = db;
