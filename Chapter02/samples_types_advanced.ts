// Union types
// ===========
var unionType: string | number;

unionType = 1;
console.log(`unionType : ${unionType}`);

unionType = "test";
console.log(`unionType : ${unionType}`);

function addWithUnion(arg1: string | number, arg2: string | number) {

    return arg1.toString() + arg2.toString();
}
console.log(`addWithUnion(1,2)= ${addWithUnion(1, 2)}`);
console.log(`addWithUnion("1","2")= ${addWithUnion("1", "2")}`);



// Type guards
// ===========
function addWithTypeGuard(
    arg1: string | number,
    arg2: string | number
): string | number {
    if (typeof arg1 === "string") {
        // arg1 is treated as string within this code
        console.log('first argument is a string');
        return arg1 + arg2;
    }
    if (typeof arg1 === "number" && typeof arg2 === "number") {
        // arg1 and arg2 are treated as numbers within this code
        console.log('both arguments are numbers');
        return arg1 + arg2;
    }
    console.log('default return');
    return arg1.toString() + arg2.toString();
}

console.log(`addWithTypeGuard(1,2)= ${addWithTypeGuard(1, 2)}`);
console.log(`addWithTypeGuard("1","2")= ${addWithTypeGuard("1", "2")}`);
console.log(`addWithTypeGuard(1,"2")= ${addWithTypeGuard(1, "2")}`);



// Type aliases
// ============
type StringOrNumber = string | number;

function addWithAlias(
    arg1: StringOrNumber,
    arg2: StringOrNumber
) {
    return arg1.toString() + arg2.toString();
}

type CallbackWithString = (input: string) => void;

function usingCallbackWithString(callback: CallbackWithString) {
    callback("this is a string");
}


// null and undefined
// ==================
let x: number | undefined;

x = 1;
x = undefined;
// x = null;

let y: number | null;

// with strictNullChecks causes compile error
// y = undefined;
y = null;

function testUndef(test: null | number) {
    console.log('test parameter :' + test);
}

testUndef(null);
testUndef(1);
// will generate an error
//testUndef();


// null operands
// =============

function testNullOperands(arg1: number, arg2: number | null | undefined) {
    // will generate errors
    // let a = arg1 + arg2;
    // let b = arg1 * arg2;
    // let c = arg1 < arg2;
}

// Never
// =====

function alwaysThrows(): never {
    throw "this will always throw";
    // generates an error
    // return -1;
}

// let neverValue: never = "test";

enum TestNeverEnum {
    FIRST,
    SECOND
}

function getEnumValue(value: TestNeverEnum) {
    switch (value) {
        case TestNeverEnum.FIRST: return "First case";
        case TestNeverEnum.SECOND: return "Second case";
    }
    let returnValue: never = value;
}


// case TestNeverEnum.SECOND: return "Second case";

// Unknown
// =======


let unknownType: unknown = "an unknown string";
console.log(`unknownType : ${unknownType}`);

unknownType = 1;
console.log(`unknownType : ${unknownType}`);

let numberType: number;
numberType = <number>unknownType;



// object rest and spread
// ======================
let firstObj = { id: 1, name: "firstObj" };

let secondObj = { ...firstObj };
console.log(`secondObj : ${JSON.stringify(secondObj)}`);

let nameObj = { name: "nameObj" };
let idObj = { id: 2 };

let obj3 = { ...nameObj, ...idObj };
console.log(`obj3 : ${JSON.stringify(obj3)}`);

let objPrec1 = { id: 1, name: "object prec 1" };
let objPrec2 = { id: 1001, description: "object prec 2 descripton" }

let obj4 = { ...objPrec1, ...objPrec2 };
console.log(`obj4 : ${JSON.stringify(obj4)}`);


// rest and spread with arrays
// ===========================

let firstArray = [1, 2, 3, 4, 5];
console.log(`firstArray=${firstArray}`);

firstArray = [...firstArray, 6, 7, 8];
console.log(`firstArray=${firstArray}`);

let secondArray = [
    { id: 1, name: "name1" },
    { id: 2, name: "name2" }
]
console.log(`secondArray : ${JSON.stringify(secondArray)}`);

secondArray = [
    { id: -1, name: "name-1" },
    ...secondArray,
    { id: 3, name: "name3" },
];
console.log(`secondArray : ${JSON.stringify(secondArray)}`);

// Definite assignment
let globalString: string;

setGlobalString();

console.log(`globalString : ${globalString!}`);

function setGlobalString() {
    return "this has been set";
}

// Tuples
// ======

let tupleType: [string, boolean];
tupleType = ["test", false];
// tupleType = ["test"];


console.log(`tupleType[0] : ${tupleType[0]}`);
console.log(`tupleType[1] : ${tupleType[1]}`);
// console.log(`tupleType[2] : ${tupleType[2]}`);

let [t1, t2] = tupleType;
console.log(`t1: ${t1}`);
console.log(`t2: ${t2}`);

// generates an error
// let [et1, et2, et3] = tupleType;

let optionalTuple: [string, boolean?];

optionalTuple = ["test2", true];
console.log(`optionalTuple : ${optionalTuple}`);

optionalTuple = ["test"];
console.log(`optionalTuple : ${optionalTuple}`);

let [op1, op2] = optionalTuple;
console.log(`op1 : ${op1}, op2 : ${op2}`)
// optionalTuple = ["test", false, "test"];

function useTupleAsRest(...args: [number, string, boolean]) {
    let [arg1, arg2, arg3] = args;
    console.log(`arg1: ${arg1}`);
    console.log(`arg2: ${arg2}`);
    console.log(`arg3: ${arg3}`);
}


useTupleAsRest(1, "stringValue", false);


type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [1, "string1", "string2", "string3"];

printRestTuple(restTuple);
restTuple = [1, "string1"];
printRestTuple(restTuple);

function printRestTuple(inTuple: RestTupleType) {
    let [arg1, ...arg2] = inTuple;
    console.log(`arg1 : ${arg1}`);
    for (let arg2Item of arg2) {
        console.log(`arg2 : ${arg2Item}`);
    }

}



// Bigint
// ======

console.log(`Number.MAX_SAFE_INTEGER : ${Number.MAX_SAFE_INTEGER}`);

let highest53bitNumber = 9_007_199_254_740_991;

for (let i = 0; i < 10; i++) {
    console.log(`${i} : ${highest53bitNumber + i}`);
}

console.log(`using bigint :`)

let bigIntNumber: bigint = 9_007_199_254_740_991n;

for (let i = 0; i < 10; i++) {
    console.log(`${i} : ${bigIntNumber + BigInt(i)}`);
}

