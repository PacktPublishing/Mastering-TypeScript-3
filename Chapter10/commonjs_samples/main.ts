// standard import module
import {Module1} from './lib/Module1';

let mod1 = new Module1();
mod1.print();

// import and rename
import {Module1 as m1} from './lib/Module1';
let m1mod1 = new m1();
mod1.print();

// export as new name from module
import {NewModule} from './lib/Module1';
let nm = new NewModule();
nm.print();


// import an interface
import {IModuleInterface} from './lib/Module1';

let implementInterface : IModuleInterface = {
    id: 1,
    name: 'test'
};

// import default export
import Module2Default from './lib/Module2';

let m2default = new Module2Default();
m2default.print();

// import default export and rename
import m2rn from './lib/Module2';

let m2renamed = new m2rn();
m2renamed.print();

import {Module2NonDefault} from './lib/Module2';
let m2nd = new Module2NonDefault();
m2nd.print();

// import variable
import { myVariable } from './lib/Module1';
console.log(myVariable);

