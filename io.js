#! /usr/bin/env node

"use strict";

// console.log(process.argv.slice(2));
var args = require("minimist")(process.argv.slice(2),{
    boolean:["help"],
    string: ["file"],
});
var path = require("path");
var fs = require("fs");

// processing arguments
if(args.file){
    console.log("processing file:", args.file);
    var filepath = path.resolve(args.file);
    processFile(filepath);
}
else if(args.help) {
    printHelp();
}
else {
    handleError("Incorrect usage", true);
}


console.log("************************************")
console.log("Std output and error");
console.log("Hello World!");

process.stdout.write("Hello World!\n");

console.error("Oops");

process.stderr.write("Oops\n");

console.log("************************************")

// *************************

function processFile(filepath) {
//    var fileContent = fs.readFileSync(filepath);
    fs.readFile(filepath, (error, content) => {
        if(error) {
            handleError(error.toString());
        } else {
            console.log("File Content Read Asynchronously:");
            process.stdout.write(content);
        }
    });
}

function handleError(errorMessage, showHelp) {
    console.error(errorMessage);
    if(showHelp) {
        console.log("");
        printHelp();
    }
}
function printHelp() {
    console.log("io usage:");
    console.log("./io.js --file={FILENAME} --help");
    console.log("");
    console.log("--help                prints this help");
    console.log("--file={FILENAME}     process the file");
    console.log("");
}
