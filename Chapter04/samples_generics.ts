//  Generics
//  ========

class Concatenator<T> {
    concatenateArray(inputArray: Array<T>): string {
        let returnString = "";

        for (let i = 0; i < inputArray.length; i++) {
            if (i > 0)
                returnString += ",";
            returnString += inputArray[i].toString();
        }
        return returnString;
    }
}

var stringConcat = new Concatenator<string>();
var numberConcat = new Concatenator<number>();

let concatResult = stringConcat.concatenateArray(
    ["first", "second", "third"]);
console.log(concatResult);

var stringArray: string[] = ["first", "second", "third"];
var numberArray: number[] = [1, 2, 3];
var stringResult =
    stringConcat.concatenateArray(stringArray);
var numberResult =
    numberConcat.concatenateArray(numberArray);

    // generates a compiler error
// var stringResult2 =
//     stringConcat.concatenateArray(numberArray);
// var numberResult2 =
//     numberConcat.concatenateArray(stringArray);

class MyClass {
    private _name: string;
    constructor(arg1: number) {
        this._name = arg1 + "_MyClass";
    }
    toString(): string {
        return this._name;
    }
}

let myArray: MyClass[] = [
    new MyClass(1),
    new MyClass(2),
    new MyClass(3)];

let myArrayConcatentator = new Concatenator<MyClass>();
let myArrayResult =
    myArrayConcatentator.concatenateArray(myArray);
console.log(myArrayResult);


//  Constraining the type of T
//  ==========================

enum ClubHomeCountry {
    England,
    Germany
}

interface IFootballClub {
    getName(): string | undefined;
    getHomeCountry(): ClubHomeCountry | undefined;
}

abstract class FootballClub implements IFootballClub {
    protected _name: string | undefined;
    protected _homeCountry: ClubHomeCountry | undefined;
    getName() { return this._name };
    getHomeCountry() { return this._homeCountry };
}

class Liverpool extends FootballClub {
    constructor() {
        super();
        this._name = "Liverpool F.C.";
        this._homeCountry = ClubHomeCountry.England;
    }
}

class BorussiaDortmund extends FootballClub {
    constructor() {
        super();
        this._name = "Borussia Dortmund";
        this._homeCountry = ClubHomeCountry.Germany;
    }
}

class FootballClubPrinter<T extends IFootballClub>
    implements IFootballClubPrinter<T> {
    print(arg: T) {
        console.log(` ${arg.getName()} is ` +
            `${this.IsEnglishTeam(arg)}` +
            ` an English football team.`
        );
    }
    IsEnglishTeam(arg: T): string {
        if (arg.getHomeCountry() == ClubHomeCountry.England)
            return "";
        else
            return "NOT"
    }
}

let clubInfo = new FootballClubPrinter();
clubInfo.print(new Liverpool());
clubInfo.print(new BorussiaDortmund());


interface IFootballClubPrinter<T extends IFootballClub> {
    print(arg: T): void;
    IsEnglishTeam(arg: T): string;
}


//  Creating new objects
//  ====================


class FirstClass {
    id: number | undefined;
}

class SecondClass {
    name: string | undefined;
}

class GenericCreator<T> {
    create(arg1: { new(): T }): T {
        return new arg1();
    }
}

var creator1 = new GenericCreator<FirstClass>();
var firstClass: FirstClass = creator1.create(FirstClass);

var creator2 = new GenericCreator<SecondClass>();
var secondClass: SecondClass = creator2.create(SecondClass);



