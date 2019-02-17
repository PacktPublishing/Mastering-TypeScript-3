// noImplicitAny
// =============

// error code
// declare function testImplicitAny();

// function testNoType(value) {
// }

// working code
declare function testImplicitAny(): void;

function testNoType(value: string) {
    console.log(`value : ${value}`);
}

// strictNullChecks
// ================

// error code

// let a : number;
// let b = a;

let c: number = 2;
let d = c;

let e: number | undefined;
let f = e;


// strictPropertyInitialization
// ============================

class WithoutInit {
    a: number;
    b: string;
    constructor(_a: number) {
        this.a = _a;
        this.b = "test";
    }
}

class WithoutInitUndefined {
    a: number | undefined;
    b: string | undefined;
}


// noUnusedLocals and noUnusedParameters
// =====================================

// error function
// function testFunction(input: string): boolean {
//     let test;
//     return false;
// }

// corrected function
function testFunction(): boolean {
    return false;
}



// noImplicitReturns
// =================

function isLargeNumber(value: number): boolean | undefined {
    if (value > 1_000_000)
        return true;
    return undefined;
}


// noFallthroughCasesInSwitch
// ==========================

enum SwitchEnum {
    ONE,
    TWO
}

// error code
// function testEnumSwitch(value: SwitchEnum) : string {
//     let returnValue = "";
//     switch(value) {
//         case SwitchEnum.ONE:
//             returnValue = "One";
//         case SwitchEnum.TWO:
//             returnValue = "Two";
//     }
//     return returnValue;
// }

// corrected code
function testEnumSwitch(value: SwitchEnum): string {
    let returnValue = "";
    switch (value) {
        case SwitchEnum.ONE:
            returnValue = "One";
            break;
        case SwitchEnum.TWO:
            returnValue = "Two";
    }
    return returnValue;
}


// noImplicitThis
// ==============

function testThis() {
    // return this;
}


// strictBindCallApply
// ===================

class MyBoundClass {
    name: string = "defaultNameValue";

    printName(index: number, description: string) {
        console.log(`this.name : ${this.name}`);
        console.log(`index : ${index}`);
        console.log(`description : ${description}`);
    }
}

let testBoundClass = new MyBoundClass();
testBoundClass.printName(1, 'testDesc');

testBoundClass.printName.call(
    { name: `overridden name property value` }
    , 12, "string");
testBoundClass.printName.apply(
    { name: `overridden by apply` },
    [1, 'apply : whoah !']);
