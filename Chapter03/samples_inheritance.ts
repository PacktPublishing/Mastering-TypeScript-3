// Interface inheritance
// =====================

interface IBase {
    id: number | undefined;
}

interface IDerivedFromBase extends IBase {
    name: string | undefined;
}

class InterfaceInheritanceClass implements IDerivedFromBase {
    id: number | undefined;
    name: string | undefined;
}


// Class inheritance
// =================

class BaseClass implements IBase {
    id: number | undefined;
}

class DerivedFromBaseClass
    extends BaseClass
    implements IDerivedFromBase {
    name: string | undefined;
}

// Implementing multiple interfaces
interface IFirstInterface {
    id: number | undefined;
}
interface ISecondInterface {
    name: string | undefined;
}
class MultipleInterfaces
    implements IFirstInterface, ISecondInterface {
    id: number | undefined;
    name: string | undefined;
}

// The super keyword
// =================

class BaseClassWithConstructor {
    private id: number;
    constructor(_id: number) {
        this.id = _id;
    }
}

class DerivedClassWithConstructor
    extends BaseClassWithConstructor {
    private name: string;
    constructor(_id: number, _name: string) {
        super(_id);
        this.name = _name;
    }
}

// Function overriding
// ====================

class BaseClassWithFunction {
    public id: number | undefined;
    getProperties(): string {
        return `id: ${this.id}`;
    }
}

class DerivedClassWithFunction
    extends BaseClassWithFunction {
    public name: string | undefined;
    getProperties(): string {
        return `${super.getProperties()}`
            + ` , name: ${this.name}`;
    }
}

var derivedClassWithFunction = new DerivedClassWithFunction();
derivedClassWithFunction.id = 1;
derivedClassWithFunction.name = "derivedName";
console.log(derivedClassWithFunction.getProperties());

// Protected class members
// =======================

class ClassUsingProtected {
    protected id: number | undefined;
    public getId() {
        return this.id;
    }
}

class DerivedFromProtected
    extends ClassUsingProtected {
    constructor() {
        super();
        this.id = 0;
    }
}

var derivedFromProtected = new DerivedFromProtected();
// generates compile error
//derivedFromProtected.id = 1;
console.log(`getId returns: ${derivedFromProtected.getId()}`);



// Abstract classes
// ================

class Employee {
    public id: number | undefined;
    public name: string | undefined;
    printDetails() {
        console.log(`id: ${this.id}`
            + `, name ${this.name}`);
    }
}

class Manager {
    public id: number | undefined;
    public name: string | undefined;
    public Employees: Employee[] | undefined;
    printDetails() {
        console.log(`id: ${this.id} `
            + `, name ${this.name}, `
            + ` employeeCount ${(<Employee[]>this.Employees).length}`);
    }
}

abstract class AbstractEmployee {
    public id: number | undefined;
    public name: string | undefined;
    abstract getDetails(): string;
    public printDetails() {
        console.log(this.getDetails());
    }
}

class NewEmployee extends AbstractEmployee {
    getDetails(): string {
        return `id : ${this.id}, name : ${this.name}`;
    }
}

class NewManager extends NewEmployee {
    public Employees: NewEmployee[] | undefined;
    getDetails(): string {
        return super.getDetails()
            + `, employeeCount ${(<Employee[]>this.Employees).length}`;
    }
}

var employee = new NewEmployee();
employee.id = 1;
employee.name = "Employee Name";

employee.printDetails();

var manager = new NewManager();
manager.id = 2;
manager.name = "Manager Name";
manager.Employees = [];

manager.printDetails();

// Instanceof
// ==========

class A {
}

class BfromA extends A {
}

class CfromA extends A {
}

class DfromC extends CfromA {
}

function checkInstanceOf(value: A | BfromA | CfromA | DfromC) {
    console.log(`checking instanceof :`)
    if (value instanceof A) {
        console.log(`found instanceof A`);
    }
    if (value instanceof BfromA) {
        console.log(`found instanceof BfromA`);
    }
    if (value instanceof CfromA) {
        console.log(`found instanceof CFromA`);
    }
    if (value instanceof DfromC) {
        console.log(`found instanceof DfromC`);
    }
}

for (let i = 0; i < 10; i++) {
    console.log(``);
}

checkInstanceOf(new A());
checkInstanceOf(new BfromA());
checkInstanceOf(new CfromA());
checkInstanceOf(new DfromC());







