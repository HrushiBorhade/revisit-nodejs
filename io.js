#! /usr/bin/env node

"use strict";

// console.log(process.argv.slice(2));
var args = require("minimist")(process.argv.slice(2),{
    boolean:["help"],
    string: ["file"],
});
console.log("arguments", args);

if(args.file){
    console.log("processing file:", args.file);
}
else if(args.help) {
    printHelp();
}
else {
    handleError("Incorrect usage", true);
}
console.log("************************************")
console.log("Hello World!");

process.stdout.write("Hello World!\n");

console.error("Oops");

process.stderr.write("Oops\n");

console.log("************************************")

function handleError(errorMessage, showHelp) {
    console.error(errorMessage);
    if(showHelp) {
        console.log("");
        printHelp();
    }
}

// *************************

function printHelp() {
    console.log("io usage:");
    console.log("./io.js --file={FILENAME} --help");
    console.log("");
    console.log("--help                prints this help");
    console.log("--file={FILENAME}     process the file");
    console.log("");
}
