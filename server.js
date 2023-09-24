const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./config/connections');
const figlet = require('figlet');


console.log('///////////////////////////////////////////////////////////////////////////////////////////////');
console.log(figlet.textSync('Employee Tracker 1.0'));
console.log('');
console.log('///////////////////////////////////////////////////////////////////////////////////////////////');

function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add department',
          'Add role',
          'Add employee',
          'Update employee role',
          'Remove department',
          'Remove role',
          'Remove employee',
          'Quit',
        ],
      },
    ])
    .then((data) => {
      switch (data.main) {
        case 'View all departments':
          viewAllDepartments();
          break;

        case 'View all roles':
          viewAllRoles()
          break;

        case 'View all employees':
          viewAllEmployees();
          break;

        case 'Add department':
          addDepartment()
          break;

        case 'Add role':
          addRole()
          break;

        case 'Add employee':
          addNewEmployee();
          break;

        case 'Update employee role':
          updateEmployeeRole();
          break;

        case 'Remove department':
          removeDepartment()
          break;

        case 'Remove role':
          removeRole()
          break;

        case 'Remove employee':
          removeEmployee()
          break;

        case 'Quit':
          process.exit();
          break;
      };
    });
};

// Function call to initialize app
init();

// View All Departments
const viewAllDepartments = () => {
  const request = 'SELECT * FROM department';
  db.query(request, (err, response) => {
    console.table(response);
    init();
  });
};

// View All Roles
const viewAllRoles = () => {
  const request = `SELECT role.id, role.title, department.name AS 'department', role.salary FROM role INNER JOIN department ON role.department_id = department.id`;
  db.query(request, (err, response) => {
    console.table(response);
    init();
  });
};

// View All Employees
const viewAllEmployees = () => {
  const request = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS 'department', role.title, CONCAT(m.first_name, ' ', m.last_name) AS 'manager', role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id ORDER BY employee.id ASC`;
  db.query(request, (error, response) => {
    console.table(response)
    init();
  });
};

// Add a New Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'newDepartment',
        type: 'input',
        message: 'What is the name of the new department?',
      }
    ])
    .then((answer) => {
      const request = 'INSERT INTO department (department.name) VALUES (?)';
      db.query(request, answer.newDepartment, (error, response) => {
        if (error) throw error;
        console.log('Department successfully created!');
        viewAllDepartments();
      });
    });
};

// Add a New Role
const addRole = () => {
  const request = 'SELECT * FROM department'
  db.query(request, (error, response) => {
    if (error) throw error;
    let deptArray = [];
    response.forEach((department) => { deptArray.push(department.name); });
    inquirer
      .prompt([
        {
          name: 'departmentName',
          type: 'list',
          message: 'In which department is this new role located?',
          choices: deptArray
        }
      ])
      .then((answer) => {
        addRoleInfo(answer);
      });

    const addRoleInfo = (departmentData) => {
      inquirer
        .prompt([
          {
            name: 'newRole',
            type: 'input',
            message: 'What is the name of the new role?',
          },
          {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this new role?',
          }
        ])
        .then((answer) => {
          const createdRole = answer.newRole;
          const salary = answer.salary;
          let departmentId;

          response.forEach((department) => {
            if (departmentData.departmentName === department.name) { departmentId = department.id; }
          });

          insertRole(createdRole, salary, departmentId);
        });
    };

    const insertRole = (title, salary, departmentId) => {
      const request = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      const param = [title, salary, departmentId];

      db.query(request, param, (error) => {
        if (error) throw error;
        console.log('Role successfully created!');
        viewAllRoles();
      });
    };
  });
};

// Add a New Employee
const addNewEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fistName',
      message: "What is the employee's first name?",
      validate: addFirstName => {
        if (addFirstName) {
          return true;
        } else {
          console.log('Please enter a first name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLastName => {
        if (addLastName) {
          return true;
        } else {
          console.log('Please enter a last name');
          return false;
        }
      }
    }
  ])
    .then(answer => {
      const param = [answer.fistName, answer.lastName]
      const roleRequest = 'SELECT role.id, role.title FROM role';
      db.query(roleRequest, (error, data) => {
        if (error) throw error;
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
          {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roles
          }
        ])
          .then(roleChoice => {
            const role = roleChoice.role;
            param.push(role);
            const managerRequest = 'SELECT * FROM employee';
            db.query(managerRequest, (error, data) => {
              if (error) throw error;
              const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'manager',
                  message: "Who is the employee's manager?",
                  choices: managers
                }
              ])
                .then(managerChoice => {
                  const manager = managerChoice.manager;
                  param.push(manager);
                  const request = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                  db.query(request, param, (error) => {
                    if (error) throw error;
                    console.log('Employee has been added!');
                    viewAllEmployees();
                  });
                });
            });
          });
      });
    });
};

// Update Employee's Role
const updateEmployeeRole = () => {
  const request = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id" FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
  db.query(request, (error, response) => {
    if (error) throw error;
    let employeeNamesArray = [];
    response.forEach((employee) => { employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`); });

    const request = 'SELECT role.id, role.title FROM role';
    db.query(request, (error, response) => {
      if (error) throw error;
      let rolesArray = [];
      response.forEach((role) => { rolesArray.push(role.title); });

      inquirer
        .prompt([
          {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee has a new role?',
            choices: employeeNamesArray
          },
          {
            name: 'chosenRole',
            type: 'list',
            message: 'What is their new role?',
            choices: rolesArray
          }
        ])
        .then((answer) => {
          let newTitleId, employeeId;

          response.forEach((role) => {
            if (answer.chosenRole === role.title) {
              newTitleId = role.id;
            }
          });

          response.forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          const requests = 'UPDATE employee SET employee.role_id = ? WHERE employee.id = ?';
          db.query(
            request,
            [newTitleId, employeeId],
            (error) => {
              if (error) throw error;
              console.log('Employee Role Updated');
              init();
            }
          );
        });
    });
  });
};

// Remove Department
const removeDepartment = () => {
  const request = 'SELECT department.id, department.name FROM department';
  db.query(request, (error, response) => {
    if (error) throw error;
    let departmentNamesArray = [];
    response.forEach((department) => { departmentNamesArray.push(department.name); });

    inquirer
      .prompt([
        {
          name: 'chosenDept',
          type: 'list',
          message: 'Which department would you like to remove?',
          choices: departmentNamesArray
        }
      ])
      .then((answer) => {
        let departmentId;

        response.forEach((department) => {
          if (answer.chosenDept === department.name) {
            departmentId = department.id;
          }
        });

        const request = 'DELETE FROM department WHERE department.id = ?';
        db.query(request, [departmentId], (error) => {
          if (error) throw error;
          console.log('Department Successfully Removed');
          viewAllDepartments();
        });
      });
  });
};

// Remove Role
const removeRole = () => {
  const request = 'SELECT role.id, role.title FROM role';

  db.query(request, (error, response) => {
    if (error) throw error;
    let roleNamesArray = [];
    response.forEach((role) => { roleNamesArray.push(role.title); });

    inquirer
      .prompt([
        {
          name: 'chosenRole',
          type: 'list',
          message: 'Which role would you like to remove?',
          choices: roleNamesArray
        }
      ])
      .then((answer) => {
        let roleId;

        response.forEach((role) => {
          if (answer.chosenRole === role.title) {
            roleId = role.id;
          }
        });

        const request = `DELETE FROM role WHERE role.id = ?`;
        db.query(request, [roleId], (error) => {
          if (error) throw error;
          console.log('Role Successfully Removed');
          viewAllRoles();
        });
      });
  });
};

// Remove Employee
const removeEmployee = () => {
  const request = 'SELECT employee.id, employee.first_name, employee.last_name FROM employee';

  db.query(request, (error, response) => {
    if (error) throw error;
    let employeeNamesArray = [];
    response.forEach((employee) => { employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`); });

    inquirer
      .prompt([
        {
          name: 'chosenEmployee',
          type: 'list',
          message: 'Which employee would you like to remove?',
          choices: employeeNamesArray
        }
      ])
      .then((answer) => {
        let employeeId;

        response.forEach((employee) => {
          if (
            answer.chosenEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }
        });

        const request = 'DELETE FROM employee WHERE employee.id = ?';
        db.query(request, [employeeId], (error) => {
          if (error) throw error;
          console.log('Employee Successfully Removed');
          viewAllEmployees();
        });
      });
  });
};


