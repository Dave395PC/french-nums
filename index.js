"use strict";

const chalk = require("chalk"); // Colours

const numToFrench = require('./numtofrench.js'); // Convert number to french written number

const readline = require('readline'); // User input

function error(txt) {
    console.error(chalk.bold.red(`Error: ${txt}`));
}

function prompt() {
    const interfacee = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    interfacee.question("Input a number (0-999999): ", input => {
        interfacee.close();
        
        let word = numToFrench(input, error);

        if(word != undefined) console.log(word);
        setTimeout(prompt, 0)
    });
}
console.log(chalk.yellow("Use Ctrl+Z to stop the program"));
prompt();

/*
let startTime = new Date();
for(let i = 0; i < 100; i++) {
    console.log(`${i}: ${numToFrench(i)}`);
}
let endTime = new Date();
console.log(`\nTime taken: ${endTime - startTime}ms\n`);
*/