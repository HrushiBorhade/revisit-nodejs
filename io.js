#! /usr/bin/env node

"use strict";

console.log(process.argv.slice(2));

console.log("Hello World!");

process.stdout.write("Hello World!\n");

console.error("Oops");

process.stderr.write("Oops\n");
