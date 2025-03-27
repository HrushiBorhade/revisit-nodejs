#! /usr/bin/env node

console.log(`Notes CLI\n`);

const note = process.argv[2];
const newNote = {
  id: Date.now(),
  note,
};
console.log("Your New Note:", newNote);
