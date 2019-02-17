import {Module1} from './lib/Module1'

console.log(`app.ts`);

let mod1 = new Module1();
console.log(mod1.print());

// bower install system.js


// typings install dt~systemjs --save --global
// cannot find name Promise
// typings install dt~es6-shim --global --save

// must run http-server at root.

