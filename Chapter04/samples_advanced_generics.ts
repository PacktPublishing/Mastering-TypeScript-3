// Conditional types
// -----------------

// (conditional statement) ? (true value) : (false value);
let trueValue = true;
let printValue = trueValue === true ? "true" : "false";

console.log(`printValue is : ${printValue}`);


type numberOrString<T> = T extends number ? number : string;

function isNumberOrString<T>(input: numberOrString<T>) {
    console.log(`numberOrString : ${input}`);
}

isNumberOrString<number>(1);
// generates compile error
// isNumberOrString<number>("test");

isNumberOrString<string>("test");



interface a {
    a: number;
}
interface ab {
    a: number;
    b: string;
}
interface abc {
    a: number;
    b: string;
    c: boolean;
}

type abc_ab_a<T> = T extends abc ? [number, string, boolean] :
    T extends ab ? [number, string] :
    T extends a ? [number]
    : never;

function getKeyAbc<T>(key: abc_ab_a<T>): string {
    let [...args] = key;
    let keyString = ":";
    for (let arg of args) {
        keyString += `${arg}:`
    }
    return keyString;
}


let key10 = getKeyAbc<a>([1]);
console.log(`key10 : ${key10}`);

let key20 = getKeyAbc<ab>([1, "test"]);
console.log(`key20 : ${key20}`);

let key30 = getKeyAbc<abc>([1, "test2", true]);
console.log(`key30 : ${key30}`);

// generates a compile error
// let keyNever = getKeyAbc<string>([1]);
// let keyABCWrong = getKeyAbc<abc>([1, "test"]);



// Distributive conditional types
// ==============================

function compareTwoValues( 
    input : string | number | Date,
    compareTo : string | number | Date ) {
}

type dateOrNumberOrString<T> = 
    T extends Date ? Date :
    T extends number ? Date | number :
    T extends string ? Date | number | string : never;

function compareValues<T extends string | number | Date | boolean>
    (input: T, compareTo : dateOrNumberOrString<T>) {

}

compareValues(new Date(), new Date());

compareValues(1, 1);
compareValues(1, Date.now());

compareValues("test", 1);
compareValues("test", "1");
compareValues("test", Date.now());

// all compile errors
// compareValues(new Date(), 1);
// compareValues(new Date(), "1");
// compareValues(1, "1");
// compareValues(true, "test");



// Conditional Type Inference
// ==========================

type extractArrayType<T> = T extends (infer U)[] ? U : never;
let stringType : extractArrayType< ["test"]> = "test";
// generates compile error
// let stringTypeNoArray : extractArrayType< "test"> = "test";


type InferredAb<T> = T extends { a: infer U, b: infer U } ? U : T;
type abInferredNumber = InferredAb< { a :number, b: number}>;
let abinf : abInferredNumber = 1;

type abInferredNumberString = InferredAb< { a :number, b: string}>;
let abinfstr : abInferredNumberString = 1;
abinfstr = "test";
// console.log(`${abInferredNumber}`);



// keyof
// =====

interface IPerson {
    id: number;
    name: string;
    surname: string;
}

type PersonPropertyLiteral = "id" | "name" | "surname";

function getKeyOfUsingStringLiteral
    (ppl : PersonPropertyLiteral, value : IPerson) {
    console.log(`${ppl} : ${value[ppl]}`)
}

let testPerson : IPerson = { id: 1, name: "test", surname: "true" }

function getKeyUsingKeyOf(key: keyof IPerson, value: IPerson): void {
    console.log(`${key} :  ${value[key]}`);
}

getKeyUsingKeyOf("id", testPerson);
getKeyUsingKeyOf("name", testPerson);
getKeyUsingKeyOf("surname", testPerson);
// generates compile error
// getKeyUsingKeyOf("notaproperty", testPerson);

// keyof number
// ============

class ClassWithNumericProperty {
    [1] : string = "one";
}

let classWithNumeric = new ClassWithNumericProperty();
console.log(`${classWithNumeric[1]} `);



enum Currency {
    AUD = 36,
    PLN = 985,
    USD = 840
}

const CurrencyName = {
    [Currency.AUD]: "Australian Dollar",
    [Currency.PLN]: "Zloty"
}

console.log(`CurrencyName[Currency.AUD] = 
    ${CurrencyName[Currency.AUD]}`);
console.log(`CurrencyName[36] = ${CurrencyName[36]}`);


function getCurrencyName<T, K extends keyof T>
    (key: K, map: T): T[K] {
    return map[key];
}

let currencyName = getCurrencyName(Currency.AUD, CurrencyName);
console.log(`name = ${currencyName}`);
currencyName = getCurrencyName(Currency.PLN, CurrencyName);
console.log(`name = ${currencyName}`);

// generates a compiler error
// name = getCurrencyName(Currency.USD, CurrencyName);


// Mapped types
// ============

interface IAbcRequired {
    a: number;
    b: string;
    c: boolean;
}

let abcObject: IAbcRequired = { a: 1, b: "test", c: true };
// let abNoCObject: IAbcRequired = { a: 1, b: "test" };

type PartialProps<T> = {
    [K in keyof T]?: T[K];
}

type IPartialAbc = PartialProps<IAbcRequired>;
let abNoCObject: IPartialAbc = { a: 1, b: "test" };
let aNoBcObject: IPartialAbc = { a: 1 };

type partialAbc = Partial<IAbcRequired>;
type readonlyAbc = Readonly<IAbcRequired>;

type pickAb = Pick<IAbcRequired,  "a" | "b">;
let pickAbObject : pickAb = { a: 1, b: "test"};
// generates an error
// let picAcObject : pickAb = { a : 1, c: true};

type recordAc = Record< "a" | "c", string>;
let recordAcObject : recordAc = {a : "test", c: "test"};
// generates an error
// let recordAcNumbers : recordAc = { a: 1, c: "test"};

