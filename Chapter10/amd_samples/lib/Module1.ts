import {Module3} from './Module3';
// export default class does not work.

export class Module1 {
    print() {
        console.log(`Module1.print()`);
        let mod3 = new Module3();
        mod3.print();
       
    }
}

// rename export in module

export {Module1 as NewModule};

export interface IModuleInterface {
    id: number;
    name: string;
}