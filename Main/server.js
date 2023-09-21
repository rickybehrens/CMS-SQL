const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const markdown = require('')

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
                type: 'input',
                name: 'name',
                message: 'What is your name?',
            },
        ])

        // TODO: Create a function to write README file
        .then((data) => {
            // Generate README content using the provided data
            let readmeContent = markdown(data);

            // Check if the user wants to include screenshots
            if (data.screenshots) {
                // Add a section for screenshots in the Table of Contents
                readmeContent += ``;
            }

            fs.writeFile('README.md', readmeContent, (err) => { // Call the generateMarkdown function
                if (err) {
                    console.error(err);
                } else {
                    console.log('Generating README file...');
                }
            });
        });
}

// Function call to initialize app
init();

// Query database
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
