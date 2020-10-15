"use strict";

const chalk = require("chalk"); // Colours

const numToFrench = require('./numtofrench.js'); // Convert number to french written number

const rl = require('readline-sync'); // User input

/**
 *  Prints an error in bold red
 *  @param {string} txt The error message
*/
function error(txt) {
    console.error(chalk.bold.red(`Error: ${txt}`));
}

/**
 * Asks the user what to do with choise of convert or list
 */
function choise() {
    let input = ask("What do you want to do? (Convert/list) ");

    input = input.toLowerCase();
    switch(input) {
        case 'convert':
        case 'c':
        case undefined || "":
            prompt();
            break;
        case 'list':
        case 'l':
            let start = ask("Start number: ");
            let end = ask("End number: ");
            let step = ask("Step: ");
            if(step == "" || isNaN(parseInt(step))) step = 1;
            else step = parseInt(step);
            list(start, end, step);
            setTimeout(choise, 0);
            break;
        default:
            //Unrecognised option
            //console.log(input);
            //console.log(typeof input);
            error(`'${input}' is not an option`);
            setTimeout(choise, 0);
            break;
    }
}

/**
 * Prompts the user for a number
 */
function prompt() {
    let input = ask("Input a number (0-999999) or 'exit' to stop: ");

    if(["exit", "break", "leave", "stop"].indexOf(input) != -1)
        return setTimeout(choise, 0);
    else {
        let word = numToFrench(input, error);

        if(word != undefined) console.log(word);
        setTimeout(prompt, 0);
    }
}

/**
 * Lists numbers en français from start to end, inclusive
 * @param {number} start >= 0
 * @param {number} end < 1,000,000
 * @param {number} step Number to iterate by
 */
function list(start, end, step = 1) {

    if(start < 0)      return error("start is less than 0!"); else
    if(start >= 999999) return error("start is too large!"); else
    if(end > 999999)    return error("end is too large!"); else
    if(end <= 0)        return error("end is too small!"); else
    if(start > end)     return error("end must be larger than start!");

    start = parseInt(start);
    end = parseInt(end);
    step = parseInt(step);

    let startTime = new Date();
    //for(let i = 0; i < 1000000; i++)
    for(let i = start; i <= end; i += step) {
        console.log(`${i}: ${numToFrench(i, error)}`);
    }
    let endTime = new Date();
    console.log(`\nTime taken: ${endTime - startTime}ms\n`);
    setTimeout(choise, 100);
}

let ask = rl.question;

console.log(chalk.yellow("Use Ctrl+Z to stop the program"));
choise();