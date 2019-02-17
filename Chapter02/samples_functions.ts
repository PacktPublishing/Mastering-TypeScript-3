

// Functions
// =========
function addNumbers(a: number, b: number): string {
    // generates a compile error
    // return (a + b);
    return (a + b).toString();
}
var addResult = addNumbers(2, 3);
console.log(`addNumbers returned : ${addResult}`);


// Anonymous functions
// ===================

var addFunction = function (a: number, b: number): number {
    return a + b;
}

var addFunctionResult = addFunction(2, 3);
console.log(`addFunctionResult : ${addFunctionResult}`);


// Optional parameters
// ===================
function concatStrings(a: string, b: string, c?: string) {
    return a + b + c;
}

var concat3strings = concatStrings("a", "b", "c");
console.log(`concat3strings : ${concat3strings}`);
var concat2strings = concatStrings("a", "b");
console.log(`concat2strings : ${concat2strings}`);
// generates a compile error
// var concat1string = concatStrings("a");


// Default parameters
// ==================
function concatStringsDefault(a: string, b: string, c: string = "c") {
    return a + b + c;
}

var defaultConcat = concatStringsDefault("a", "b");
console.log(`defaultConcat : ${defaultConcat}`);


// Rest parameters
// ===============
function testArguments(...argArray: number[]) {
    if (argArray.length > 0) {
        for (var i = 0; i < argArray.length; i++) {
            console.log(`argArray[${i}] = ${argArray[i]}`);
            // use JavaScript arguments variable
            console.log(`arguments[${i}] = ${arguments[i]}`)
        }
    }
}

testArguments(9);
testArguments(1, 2, 3);


function testNormalAndRestArguments(
    arg1: string,
    arg2: number,
    ...argArray: number[]
) {

}


// Function callbacks
// ==================

function callbackFunction(text: string) {
    console.log(`inside callbackFunction ${text}`);
}

function doSomethingWithACallback(
    initialText: string,
    callback: (initialText: string) => void
) {
    console.log(`inside doSomethingWithCallback ${initialText}`);
    callback(initialText);
}

doSomethingWithACallback("myText", callbackFunction);

// doSomethingWithACallback("myText", "this is not a function");

function callbackFunctionWithNumber(arg1: number) {
    console.log(`inside callbackFunctionWithNumber ${arg1}`)
}
// generates a compile error
// doSomethingWithACallback("myText", callbackFunctionWithNumber);



// Function overrides
// ==================

function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: any, b: any): any {
    return a + b;
}

console.log(`add(1,1)= ${add(1, 1)}`);
console.log(`add("1","1")= ${add("1", "1")}`);

// generates an error
// console.log(`add(true,false)= ${add(true, false)}`);

// try catch
// =========

try {
    console.log(`1. attempting to parse JSON`);
    JSON.parse(`abcd=234`);
} catch (error) {
    console.log(`2. try catch error : ${error}`);
} finally {
    console.log(`3. finally`);
}


try {
    console.log(`1. attempting to parse JSON`);
    JSON.parse(`abcd=234`);
} catch {
    console.log(`2. caught`);
} finally {
    console.log(`3. finally`);
}