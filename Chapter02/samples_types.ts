
// Type syntax
// ===========
function doCalculation(
    a: number,
    b: number,
    c: number) {
    return (a * b) + c;
}

var result = doCalculation(3, 2, 1);
console.log("doCalculation():" + result);

// causes compilation errors
// result = doCalculation("1", "2", "3");
// console.log("doCalculation():" + result);

var myString: string;
var myNumber: number;
var myBoolean: boolean;

myString = "1";
myNumber = 1;
myBoolean = true;

// causes compilation errors
// myString = myNumber;
// myBoolean = myString;
// myNumber = myBoolean;

myString = myNumber.toString();
myBoolean = (myString === "test");
if (myBoolean) {
    myNumber = 1;
}

// Inferred typing
// ===============

var inferredString = "this is a string";
var inferredNumber = 1;
// causes compilation errors
// inferredString = inferredNumber;




// Duck typing
// ===========
var complexType = { name: "myName", id: 1 };
complexType = { id: 2, name: "anotherName" };
// generates a compile error
// complexType = { id: 1 };
// complexType = { name: "extraproperty", id: 2, extraProp: true };


// Template strings
// ================
var myVariable = "test";
console.log("myVariable=" + myVariable);

console.log(`myVariable=${myVariable}`);

var complexObject = {
    id: 2,
    name: 'testObject'
}

console.log(`complexObject = ${JSON.stringify(complexObject)}`);



// Arrays
// ======
var arrayOfNumbers: number[] = [1, 2, 3];
arrayOfNumbers = [3, 4, 5, 6, 7, 8, 9];
console.log(`arrayOfNumbers: ${arrayOfNumbers}`);
// generates a compile error
// arrayOfNumbers = ["1", "2", "3"];

// For ... of
// ==========

var arrayOfStrings: string[] = ["first", "second", "third"];

for (var i = 0; i < arrayOfStrings.length; i++) {
    console.log(`arrayOfStrings[${i}] = ${arrayOfStrings[i]}`);
}

for (var itemKey in arrayOfStrings) {
    var itemValue = arrayOfStrings[itemKey];
    console.log(`arrayOfStrings[${itemKey}] = ${itemValue}`);
}

for (var arrayItem of arrayOfStrings) {
    console.log(`arrayItem = ${arrayItem} `);
}



// The any type
// ============
var item1: any = { id: 1, name: "item 1" };
item1 = { id: 2 };

var item1 = <any>{ id: 1, name: "item 1" };
item1 = { id: 2 };


// Enums
// =====
enum DoorState {
    Open,
    Closed,
    Ajar
}

var openDoor = DoorState.Open;
console.log(`openDoor is: ${openDoor}`);

var closedDoor = DoorState["Closed"];
console.log(`closedDoor is : ${closedDoor}`);


// Const enums
// ===========
const enum DoorStateConst {
    Open,
    Closed,
    Ajar
}

var constDoorOpen = DoorStateConst.Open;
console.log(`constDoorOpen is : ${constDoorOpen}`);

// generates a compile error
//console.log(`${DoorStateConst[0]}`);

console.log(`${DoorStateConst["Open"]}`);

// String enums
// ============

enum DoorStateString {
    Open = "open",
    Closed = "closed",
    Ajar = "ajar"
}

var openDoorString = DoorStateString.Open;
console.log(`openDoorString = ${openDoorString}`);

// Enum implementation
// ===================
var ajarDoor = DoorState[2];
console.log(`ajarDoor is : ${ajarDoor}`);

// Const and let
// =============
// with strictNullChecks, this generates an error
// console.log(`1. anyValue = ${anyValue}`);
var anyValue = 2;
console.log(`2. anyValue = ${anyValue}`);

// generates a compile error
//console.log(`letValue = ${lValue}`);
let lValue = 2;
console.log(`lValue = ${lValue}`);

if (lValue == 2) {
    let lValue = 2001;
    console.log(`block scoped lValue : ${lValue} `);
}
console.log(`lValue = ${lValue}`);



const constValue = "test";
// generates a compile error
//constValue = "updated";


// Dotted property types
// =====================

let normalObject = {
    id: 1,
    name: "test"
}

let stringObject = {
    "testProperty": 1,
    "anotherProperty": "this is a string"
}

let testProperty = stringObject.testProperty;
console.log(`testPropertyValue = ${testProperty}`);

let testStringProperty = stringObject["testProperty"];
console.log(`"testPropertyValue" = ${testStringProperty}`);

// Numberic Separators
// ===================

let oneMillion = 1_000_000;
console.log(`oneMillion = ${oneMillion}`);

let limeGreenColor = 0x00_FF_00;
console.log(`limeGreenColor = ${limeGreenColor}`);
