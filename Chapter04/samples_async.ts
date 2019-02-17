
//  Promises
//  ========


function delayedResponseWithCallback(callback: Function) {
    function delayedAfterTimeout() {
        console.log(`3. delayedAfterTimeout`);
        callback();
    }
    setTimeout(delayedAfterTimeout, 1000);
}

function callDelayedAndWait() {
    function afterWait() {
        console.log(`4. afterWait`);
    }
    console.log(`1. calling delayedResponseWithCallback`);
    delayedResponseWithCallback(afterWait);
    console.log(`2. after callng delayedResponseWithCallback`);
}

callDelayedAndWait();

//  Promise syntax
//  ==============

function fnDelayedPromise(
    resolve: () => void,
    reject: () => void) {
    function afterTimeout() {
        resolve();
    }

    setTimeout(afterTimeout, 2000);
}

function delayedResponsePromise(): Promise<void> {
    return new Promise<void>(
        fnDelayedPromise
    );
}

function delayedPromise(): Promise<void> {
    return new Promise<void>
    (
        (resolve: () => void,
            reject: () => void
        ) => {
            function afterTimeout() {
                resolve();
            }

            setTimeout(afterTimeout, 1000);
        }
    );
}

function callDelayedPromise() {
    console.log(`calling delayedPromise`);
    delayedPromise().then(
        () => { console.log(`delayedPromise.then()`) }
    );
}

callDelayedPromise();

function errorPromise(): Promise<void> {
    return new Promise<void>
        (
        (resolve: () => void,
            reject: () => void
        ) => {
            reject();
        }
        );
}

function callErrorPromise() {
    console.log(`calling errorPromise`);
    errorPromise().then(
        () => { console.log(`no error.`) }
    ).catch(
        () => { console.log(`an error occurred`) }
    );
}

callErrorPromise();

function invokeAsync(success: Function, error: Function) {

}

function standardCallback() {
    function afterCallbackSuccess() {
        // execute this code
    }
    function afterCallbackError() {
        // execute on error
    }
    // invoke async function
    invokeAsync(afterCallbackSuccess, afterCallbackError);
}

function usingPromises() {
    // invoke async function
    delayedPromise().then(
        () => {
            // execute on success
        }
    ).catch(
        () => {
            // execute on error
        }
    );
}


function delayedPromiseWithParam(): Promise<string> {
    return new Promise<string>(
        (
            resolve: (str: string) => void,
            reject: (str: string) => void
        ) => {

            function afterWait() {
                resolve("resolved_within_promise");
            }
            setTimeout(afterWait, 2000);
        }
    );
}

function callPromiseWithParam() {
    console.log(`calling delayedPromiseWithParam`);
    delayedPromiseWithParam().then((message: string) => {
        console.log(`Promise.then() returned ${message} `);
    });
}

callPromiseWithParam();


interface IPromiseMessage {
    message: string;
    id: number;
}

function promiseWithInterface(): Promise<IPromiseMessage> {
    return new Promise<IPromiseMessage>(
        (
            resolve: (message: IPromiseMessage) => void,
            reject: (message: IPromiseMessage) => void
        ) => {
            resolve({ message: "test", id: 1 });
        }
    );
}

//  Async await
//  ===========


function awaitDelayed(): Promise<void> {
    return new Promise<void>(
        (resolve: () => void,
            reject: () => void) => {
            function afterWait() {
                console.log(`2. calling resolve`);
                resolve();
            }
            setTimeout(afterWait, 1000);
        }
    );
}

async function callAwaitDelayed() {
    console.log(`1. call awaitDelayed`);
    await awaitDelayed();
    console.log(`3. after awaitDelayed`);
}

callAwaitDelayed();

//  Async errors
//  ============

function awaitError(): Promise<string> {
    return new Promise<string>(
        (resolve: (message: string) => void,
            reject: (error: string) => void) => {
            function afterWait() {
                console.log(`2. calling reject`);
                reject("an error occurred");
            }
            setTimeout(afterWait, 1000);
        }
    );
}

async function callAwaitError() {
    console.log(`1. call awaitError`);
    try {
        await awaitError();
    } catch (error) {
        console.log(`3. error returned : ${error}`);
    }
    console.log(`4. after awaitDelayed`);
}

callAwaitError();


function simplePromises() {
    // invoke async function
    delayedPromise().then(
        () => {
            // execute on success
        }
    ).catch(
        () => {
            // execute on error
        }
    );
    // code here does NOT wait for async call
}

async function usingAsyncSyntax() {
    try {
        await delayedPromise();
        // execute on success
    } catch (error) {
        // execute on error
    }
    // code here waits for async call
}

function asyncWithMessage(): Promise<string> {
    return new Promise<string>(
        (resolve: (message: string) => void,
            reject: (message: string) => void
        ) => {
            function afterWait() {
                resolve("resolve_message");
            }
            setTimeout(afterWait, 1000);
        }
    );
}

async function awaitMessage() {
    console.log(`calling asyncWithMessage`);
    let message: string = await asyncWithMessage();

    console.log(`message returned: ${message}`);
}

awaitMessage();

