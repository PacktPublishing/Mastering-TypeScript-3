var test: string = "this is a string";

// these lines generate compile errors
//test = 1;
//test = function(a, b) { return a + b; }

declare function describe(
    description: string,
    specDefinitions: () => void
): void;

// this line generates a compile error
// describe( () => {}, "description" );

class MyClass {
    add(x: number, y: number) {
        return x + y;
    }
}

var classInstance = new MyClass();
var result = classInstance.add(1, 2);
console.log(`add(1,2) returns ${result}`);


class CountClass {
    private _count: number;
    constructor() {
        this._count = 0;
    }
    countUp() {
        this._count++;
    }
    getCount() {
        return this._count;
    }
}

var countInstance = new CountClass();
// this line generates a compile error
// countInstance._count = 17;



