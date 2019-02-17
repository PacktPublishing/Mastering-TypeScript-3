import {Module3} from './Module3';
// export default class does not work.

export class Module1 {
    print() {
        print(`Module1.print()`);
    }
}

// rename export in module
export {Module1 as NewModule};


function print(functionName: string) {
    console.log(`print() called with ${functionName}`);
}


export interface IModuleInterface {
    id: number;
    name: string;
}


var myVariable = "This is a variable.";

export { myVariable }