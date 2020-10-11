"use strict";

const chalk = require("chalk"); // Colours

const numToFrench = require('./numtofrench.js');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

/*readline.question("Input a number (len 2): ", input => {
    readline.close();
    
    let word = numToFrench(input);

    console.log(word);
});*/

let startTime = new Date();
for(let i = 0; i < 100; i++) {
    console.log(`${i}: ${numToFrench(i)}`);
}
let endTime = new Date();
console.log(`\nTime taken: ${endTime - startTime}ms\n`);