const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'luckydog',
    database: 'acme_db'
  },
  console.log(`Connected to the acme_db database.`)
);

db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
