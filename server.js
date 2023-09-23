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

function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'main', // Use 'main' here to match the variable name
        message: 'What would you like to do?',
        choices: [
          'View all employees',
          'View all employees by department',
          'View all employees by manager',
          'Add employee',
          'Remove employee',
          'Update employee role',
          'Update employee manager',
          'View all roles',
          'Add role',
          'Remove role',
          'View all departments',
          'Add department',
          'Remove department',
          'View total utilized budget by department',
          'Quit',
        ],
      },
    ])
    .then((data) => {
      switch (data.main) {
        case 'View all employees':
          db.query('SELECT * FROM employee', function (err, results) {
            console.log(results);
          });
          break;

        case 'View all employees by department':

          break;

        case 'View all employees by manager':

          break;

        case 'Add employee':
          addNewEmployee();
          break;

        case 'Remove employee':

          break;

        case 'Update employee role':

          break;

        case 'Update employee manager':

          break;

        case 'View all roles':
          db.query('SELECT * FROM role', function (err, results) {
            console.log(results);
          });
          break;

        case 'Add role':

          break;

        case 'Remove role':

          break;

        case 'View all departments':
          db.query('SELECT * FROM department', function (err, results) {
            console.log(results);
          });
          break;

        case 'Add department':

          break;

        case 'Remove department':

          break;

        case 'View total utilized budget by department':

          break;

        case 'Quit':
          console.log('quit');
          break;
      };
    });
};

// Function call to initialize app
init();

const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first-name",
        message: "What's the new employee's first name?",
      },
      {
        type: "input",
        name: "last-name",
        message: "What's the new employee's last name?",
      },
      {
        type: "list",
        name: "role-id",
        message: "What's the new employee's role?",
        choices: [
          "Sales Person",
          "Sales Manager",
          "Market Analyst",
          "Senior Market Analyst",
          "Marketing Manager",
          "Programmer",
          "Senior Programmer",
          "IT Manager",
          "Paralegal",
          "Counsel",
          "Chief Legal Counsel",
          "Financial Analyst",
          "Accounting Manager",
          "CFO",
          "Procurement Specialist",
          "Supply Chain Manager",
          "HR Coordinator",
          "HR Manager",
          "Line Employee",
          "Line Manager",
          "Production Manager",
          "COO",
          "CEO",
        ],
      },
      {
        type: "list",
        name: "manager-id",
        message: "Who's the new employee's manager?",
        choices: [
          "Courtney Cox",
          "Michael Garrigus",
          "Marcus Gambia",
          "Al Smith",
          "Charles Ivery",
          "Edward Zea",
          "Edward Walsh",
          "Frederic Plummer",
          "Gustav Moser",
        ],
      },
    ])
    .then((answers) => {
      // Construct the SQL INSERT statement
      const sql = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)
      `;

      const values = [
        answers['first-name'],
        answers['last-name'],
        answers['role-id'],
        answers['manager-id'],
      ];

      // Execute the INSERT query
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error adding employee:', err);
        } else {
          console.log(`Added new employee: ${answers['first-name']} ${answers['last-name']}`);
        }
        // You can add further code here if needed
      });
    });
};

db.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
