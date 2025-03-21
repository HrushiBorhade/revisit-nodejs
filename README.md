# Revisit Nodejs

## Command Line Script
- Console log/process stdout
- Console Error/process stderr
- Node Shebang to make it executable
- Command Line arguments
- Argument parsing with minimist
- Read file(Sync,Async)
- Input from stdin
- Environment Variables

## Streams
- File Handling with streams

### Example for [io.js](./io.js)
```
➜  revisit-nodejs git:(main) ✗ cat hello_world.txt | environment="Production" BASE_PATH="./" ./io.js --in --file="hello_world.txt"
**************** ARGUMENTS **********************
arguments { _: [], help: false, in: true, file: 'hello_world.txt' }
*************************************************

************* ENVIRONMENT VARIABLES *************
Environment Production
Base Path ./
*************************************************
processing file: hello_world.txt
************************************
Std output and error
Hello World!
Hello World!
Oops
Oops
************************************
File Content Read Asynchronously:
HELLO WORLD!
```