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
          viewAllEmployees();
          break;

        case 'View all employees by department':

          init();
          break;

          init();
        case 'View all employees by manager':

          break;

          init();
        case 'Add employee':
          addNewEmployee();
          break;

        case 'Remove employee':

          init();
          break;

        case 'Update employee role':

          init();
          break;

        case 'Update employee manager':

          init();
          break;

        case 'View all roles':
          db.query('SELECT * FROM role', function (err, results) {
            console.log(results);
          });
          init();
          break;

        case 'Add role':

          init();
          break;

        case 'Remove role':

          init();
          break;

        case 'View all departments':
          db.query('SELECT * FROM department', function (err, results) {
            console.log(results);
          });
          init();
          break;

        case 'Add department':

          init();
          break;

        case 'Remove department':

          init();
          break;

        case 'View total utilized budget by department':

          init();
          break;

        case 'Quit':
          process.exit();
          break;
      };
    });
};

// Function call to initialize app
init();

// View All Employees
const viewAllEmployees = () => {
  const example = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS 'department', role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDER BY employee.id ASC`;
  db.query(example, (error, response) => {
    console.table(response)
    init();
  });
};

const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What's the new employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What's the new employee's last name?",
      },
      {
        type: "list",
        name: "department",
        message: "What department will the new employee work?",
        choices: [
          "Sales and Marketing",
          "IT",
          "Legal",
          "Accounting",
          "Purchasing",
          "HR",
          "Production",
        ],
      },
      {
        type: "list",
        name: "roleId",
        message: "What's the new employee's role?",
        choices: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
        ],
      },
      {
        type: "list",
        name: "managerId",
        message: "Who's the new employee's manager?",
        choices: [
          2,
          5,
          8,
          11,
          14,
          16,
          18,
          22,
          23,
        ],
      },
    ])
    .then((employeeData) => {
      console.log(employeeData.firstName)
      // Create a SQL query to insert the new employee
      const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
      `;

      // Execute the query with the provided employee data
      db.query(
        query,
        [
          employeeData.firstName,
          employeeData.lastName,
          employeeData.roleId,
          employeeData.managerId || null, // Use null if manager_id is not provided
        ],
        (err, results) => {
          if (err) {
            console.error('Error adding employee:', err);
          } else {
            console.log('Employee added successfully!');
          }
          // Close the database connection
        }
      );
      init();
    });
};

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
