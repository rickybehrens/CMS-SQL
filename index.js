const express = require('express');
const info = require('./db');
const fisrt = require('./db/connections');

function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
            },
        ])

        
        .then((data) => {
            

        });
}

// Function call to initialize app
init();