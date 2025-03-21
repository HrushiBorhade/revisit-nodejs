#! /usr/bin/env node

"use strict";

// console.log(process.argv.slice(2));
var args = require("minimist")(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});
var path = require("path");
var fs = require("fs");
var getStdin = require("get-stdin");

// processing arguments
if (args.file) {
  console.log("processing file:", args.file);
  var filepath = path.resolve(args.file);
  //    var content = fs.readFileSync(filepath);
  fs.readFile(filepath, (error, content) => {
    if (error) {
      handleError(error.toString());
    } else {
      console.log("File Content Read Asynchronously:");
      processFile(content);
    }
  });
} else if (args._.includes("-") || args.in) {
  console.log("Input from Stdin:");
  getStdin().then(processFile).catch(handleError);
} else if (args.help) {
  printHelp();
} else {
  handleError("Incorrect usage", true);
}

console.log("************************************");
console.log("Std output and error");
console.log("Hello World!");

process.stdout.write("Hello World!\n");

console.error("Oops");

process.stderr.write("Oops\n");

console.log("************************************");

function processFile(fileContent) {
  fileContent = fileContent.toString().toUpperCase();
  process.stdout.write(fileContent);
}

function handleError(errorMessage, showHelp) {
  console.error(errorMessage);
  if (showHelp) {
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
