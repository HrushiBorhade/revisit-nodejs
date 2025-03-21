#! /usr/bin/env node

"use strict";

// console.log(process.argv.slice(2));
var args = require("minimist")(process.argv.slice(2), {
  boolean: ["help", "in", "out"],
  string: ["file"],
});
var path = require("path");
var fs = require("fs");
var getStdin = require("get-stdin");
var {Transform} = require("stream");

console.log("**************** ARGUMENTS **********************");
console.log("arguments", args);
console.log("*************************************************");
console.log("");

console.log("************* ENVIRONMENT VARIABLES *************");
console.log("Environment", process.env.environment);
console.log("Base Path", process.env.BASE_PATH);
console.log("*************************************************");

var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);
var OUTPATH = path.join(BASE_PATH, "out.txt");

// processing arguments
if (args.file) {
  console.log("processing file:", args.file);
  var filepath = path.join(BASE_PATH, args.file);
  var fileStream = fs.createReadStream(filepath);
  processFile(fileStream);

  // var content = fs.readFileSync(filepath);
  // fs.readFile(filepath, (error, content) => {
  //   if (error) {
  //     handleError(error.toString());
  //   } else {
  //     console.log("File Content Read Asynchronously:");
  //     processFile(content);
  //   }
  // });

} else if (args._.includes("-") || args.in) {
  console.log("Input from Stdin:");
  processFile(process.stdin);
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

function processFile(inStream) {
  var outStream = inStream;
  
  var upperStream = new Transform({
    transform(chunk, enc, cb) {
      this.push(chunk.toString().toUpperCase());
      cb();
    }
  })
  outStream = outStream.pipe(upperStream);

  var targetStream;
  if(args.out){
    targetStream = process.stdout;
  }else{
    targetStream = fs.createWriteStream(OUTPATH);
  }

  outStream.pipe(targetStream);
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
  console.log("--in                  process stdin");
  console.log("--out                 print to stdout");
  console.log("");
}
