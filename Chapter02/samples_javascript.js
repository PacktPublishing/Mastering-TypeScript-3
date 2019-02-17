// JavaScript typing
// =================
function doCalculation(a, b, c) {
    return (a * b) + c;
}

var result = doCalculation(2, 3, 1);
console.log('doCalculation():' + result);

result = doCalculation("2", "3", "1");
console.log('doCalculation():' + result);


// Anonymous functions
// ===================
var addVar = function (a, b) {
    return a + b;
}

var addVarResult = addVar(2, 3);
console.log("addVarResult:" + addVarResult);


// Optional parameters
// ===================
var concatStrings = function (a, b, c) {
    return a + b + c;
}
var concatAbc = concatStrings("a", "b", "c");
console.log("concatAbc :" + concatAbc);
var concatAb = concatStrings("a", "b");
console.log("concatAb :" + concatAb);

// Rest parameters
// ===============
function testArguments() {
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            console.log("argument[" + i + "] = " + arguments[i]);
        }
    }
}

testArguments(1, 2, 3);
testArguments("firstArg");

// Callback functions
// ==================
var callbackFunction = function (text) {
    console.log('inside callbackFunction ' + text);
}

function doSomethingWithACallback(initialText, callback) {
    console.log('inside doSomethingWithCallback ' + initialText);
    if (typeof callback === "function") {
        callback(initialText);
    } else {
        console.log(callback + ' is not a function !!')
    }
}

doSomethingWithACallback('myText', 'anotherText');
doSomethingWithACallback('myText', callbackFunction);


// Function overloads
// ==================
function add(x, y) {
    return x + y;
}

console.log('add(1,1)=' + add(1, 1));
console.log('add("1","1")=' + add("1", "1"));


// Undefined variables
// ===================
function testUndef(test) {
    console.log('test parameter :' + test);
}

testUndef();
testUndef(null);
testUndef(1);
testUndef("stringValue");