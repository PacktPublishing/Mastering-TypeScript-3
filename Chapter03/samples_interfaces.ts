
// Interfaces
// ==========

interface IComplexType {
    id: number;
    name: string;
    //constructor(arg1: any, arg2: any);
    // print(): string;
    // usingTheAnyKeyword(arg1: any): any;
    // usingOptionalParameters(optionalArg1?: number) : void;
    // usingDefaultParameters(defaultArg1?: number) : void;
    // usingRestSyntax(...argArray: number []): void;
    // usingFunctionCallbacks(callback: (id: number) => string): void;
}

let complexType: IComplexType;
complexType = { id: 1, name: "test" };

// generates a compile error
// let incompleteType : IComplexType;
// incompleteType = { id : 1};



// Optional properties
// ===================
interface IOptionalProp {
    id: number;
    name?: string;
}

let idOnly: IOptionalProp = { id: 1 };
let idAndName: IOptionalProp = { id: 2, name: "idAndName" };

idAndName = idOnly;

// WeakTypes
// =========

interface IWeakType {
    id?: number,
    name?: string
}

let weakTypeNoOverlap: IWeakType;
// generates an error
// weakTypeNoOverlap = { description: "my description" };



interface IHasIdAndNameProperty {
    id: number;
    name: string;
}

interface IHasDescAndValueProperty {
    description: string;
    value: number;
}

function printNameOrDescription(
    value: IHasIdAndNameProperty
        | IHasDescAndValueProperty) {
    if ('id' in value) {
        console.log(`found id ! | name : ${value.name}`);
    }
    if ('value' in value) {
        console.log(`found value ! : description : ${value.description}`);
    }
}

printNameOrDescription({ id: 1, name: "idname" });
printNameOrDescription({ value: 1, description: "valueDescription" });


