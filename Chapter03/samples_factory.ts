
// Factory Design Pattern
// ======================

enum PersonCategory {
    Infant,
    Child,
    Adult,
    Undefined
}

interface IPerson {
    Category: PersonCategory;
    canSignContracts(): boolean;
    printDetails(): void;
}

abstract class Person implements IPerson {
    Category: PersonCategory;
    private DateOfBirth: Date;

    constructor(dateOfBirth: Date) {
        this.DateOfBirth = dateOfBirth;
        this.Category = PersonCategory.Undefined;
    }

    abstract canSignContracts(): boolean

    printDetails(): void {
        console.log(`Person : `);
        console.log(`Date of Birth : `
            + `${this.DateOfBirth.toDateString()}`);
        console.log(`Category      : `
            + `${PersonCategory[this.Category]}`);
        console.log(`Can sign      : `
            + `${this.canSignContracts()}`);
    }
}


class Infant extends Person {
    constructor(dateOfBirth: Date) {
        super(dateOfBirth);
        this.Category = PersonCategory.Infant;
    }
    canSignContracts(): boolean { return false; }
}

class Child extends Person {
    constructor(dateOfBirth: Date) {
        super(dateOfBirth);
        this.Category = PersonCategory.Child;
    }
    canSignContracts(): boolean { return false; }
}

class Adult extends Person {
    constructor(dateOfBirth: Date) {
        super(dateOfBirth);
        this.Category = PersonCategory.Adult;
    }
    canSignContracts(): boolean { return true; }
}

class PersonFactory {
    getPerson(dateOfBirth: Date): IPerson {
        let dateNow = new Date(); // defaults to now.
        let currentMonth = dateNow.getMonth() + 1;
        let currentDate = dateNow.getDate();

        let dateTwoYearsAgo = new Date(
            dateNow.getFullYear() - 2,
            currentMonth, currentDate);

        let date18YearsAgo = new Date(
            dateNow.getFullYear() - 18,
            currentMonth, currentDate);

        if (dateOfBirth >= dateTwoYearsAgo) {
            return new Infant(dateOfBirth);
        }
        if (dateOfBirth >= date18YearsAgo) {
            return new Child(dateOfBirth);
        }
        return new Adult(dateOfBirth);
    }
}

for (let i = 0; i < 10; i++) {
    console.log(``);
}

let factory = new PersonFactory();
let p1 = factory.getPerson(new Date(2017, 0, 20));
p1.printDetails();
let p2 = factory.getPerson(new Date(2010, 0, 20));
p2.printDetails();
let p3 = factory.getPerson(new Date(1969, 0, 20));
p3.printDetails();

for (let i = 0; i < 5; i++) {
    console.log(``);
}



























