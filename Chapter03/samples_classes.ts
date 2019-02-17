

// Classes
// =======

interface ISimpleClass {
    id: number;
    print(): void;
}

class SimpleClass {
    id: number | undefined;
    print(): void {
        console.log(`SimpleClass has id : ${this.id}`);
    }
}

let mySimpleClass = new SimpleClass();
mySimpleClass.id = 1001;
mySimpleClass.print();


// Implementing Intefaces
// =========
class ClassA implements IPrint {
    print() { console.log('ClassA.print()') };
}

class ClassB implements IPrint {
    print() { console.log(`ClassB.print()`) };
}

interface IPrint {
    print(): void;
}

function printClass(a: IPrint) {
    a.print();
}

let classA = new ClassA();
let classB = new ClassB();

printClass(classA);
printClass(classB);


// Class constructors
// ==================

class ClassWithConstructor {
    id: number;
    name: string;
    constructor(_id: number, _name: string) {
        this.id = _id;
        this.name = _name;
    }
}

let classWithConstructor = new ClassWithConstructor(1, "name");

console.log(`classWithConstructor = 
    ${JSON.stringify(classWithConstructor)}`);

// Class functions
// ===============


class ComplexType implements IComplexType {
    id: number;
    name: string;
    constructor(idArg: number, nameArg: string);
    constructor(idArg: string, nameArg: string);
    constructor(idArg: any, nameArg: any) {
        // careful - assigning a string to a number type
        this.id = idArg;

        if (typeof idArg === "number") {
            // only assign to id if this is a number
            this.id = idArg;
        }

        this.name = nameArg;


    }
    print(): void {
        console.log(`id: ${this.id} name : ${this.name}`);
    }
    usingTheAnyKeyword(arg1: any): any {
        this.id = arg1;
    }
    usingOptionalParameters(optionalArg1?: number) {
        if (optionalArg1) {
            this.id = optionalArg1;
        }
    }
    usingDefaultParameters(defaultArg1: number = 0) {
        this.id = defaultArg1;
    }
    usingRestSyntax(...argArray: number[]) {
        if (argArray.length > 0) {
            this.id = argArray[0];
        }
    }
    usingFunctionCallbacks(callback: (id: number) => string) {
        callback(this.id);
    }

}

let ct_1 = new ComplexType(1, "ct_1");
let ct_2 = new ComplexType("abc", "ct_2");
//let ct_3 = new ComplexType(true, "test");

ct_1.print();
ct_2.print();

ct_1.usingTheAnyKeyword(true);
ct_1.usingTheAnyKeyword({ id: 1, name: "string" });

ct_1.usingOptionalParameters(1);
ct_1.usingOptionalParameters();

ct_1.usingDefaultParameters(2);
ct_1.usingDefaultParameters();

ct_1.usingRestSyntax(1, 2, 3);
ct_2.usingRestSyntax(1, 2, 3, 4, 5);

function myCallbackFunction(id: number): string {
    return id.toString();
}
ct_1.usingFunctionCallbacks(myCallbackFunction);


// Class modifiers
// ===============


class ClassWithPublicProperty {
    public id: number | undefined;
}

let publicAccess = new ClassWithPublicProperty();
publicAccess.id = 10;


class ClassWithPrivateProperty {
    private id: number;
    constructor(_id: number) {
        this.id = _id;
    }
}

let privateAccess = new ClassWithPrivateProperty(10);
// caused compilation error
// privateAccess.id = 20;




class ClassWithModifiers {
    private id: number;
    private name: string;
    constructor(_id: number, _name: string) {
        this.id = _id;
        this.name = _name;
    }
    private updateNameFromId() {
        this.name = `${this.id}_name`;
    }
}

var classWithModifiers = new ClassWithModifiers(1, "className");
// generates compile errors
//classWithModifiers.id = 1;
//classWithModifiers.updateNameFromId();



// Constructor access modifiers
// ============================

class classWithAutomaticProperties {
    constructor(public id: number, private name: string) {
    }
}

let myAutoClass =
    new classWithAutomaticProperties(1, "className");
console.log(`myAutoClass id: ${myAutoClass.id}`);

// generates compile errors
// console.log(`myAutoClass.name: ${myAutoClass.name}`);

// Class property accessors
// ========================

class ClassWithAccessors {
    private _id: number | undefined;
    get id() {
        console.log(`inside get id()`);
        return <number>this._id;
    }
    set id(value: number) {
        console.log(`inside set id()`);
        this._id = value;
    }
}

var classWithAccessors = new ClassWithAccessors();
classWithAccessors.id = 2;
console.log(`id property is set to ${classWithAccessors.id}`);



// Static functions
// ================

class StaticClass {
    static printTwo() {
        console.log(`2`);
    }
}

StaticClass.printTwo();



// Static properties
// =================

class StaticProperty {
    static count = 0;
    updateCount() {
        StaticProperty.count++;
    }
}

let firstInstance = new StaticProperty();

console.log(`StaticProperty.count = ${StaticProperty.count}`);
firstInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);

let secondInstance = new StaticProperty();
secondInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);


// Namespaces
// ==========

namespace FirstNameSpace {
    class NotExported {
    }
    export class NameSpaceClass {
        id: number | undefined;
    }
}

let firstNameSpace = new FirstNameSpace.NameSpaceClass();
// generates compile error
//let notExported = new FirstNameSpace.NotExported();

namespace SecondNameSpace {
    export class NameSpaceClass {
        name: string | undefined;
    }
}

let secondNameSpace = new SecondNameSpace.NameSpaceClass();

// generates compile error
// firstNameSpace = secondNameSpace;



