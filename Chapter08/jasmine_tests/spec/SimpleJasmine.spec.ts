describe('spec/SimpleJasmine.spec.ts', () => {
    it('a value should be defined', () => {
        let undefinedValue = "test";
        expect(undefinedValue).toBeDefined('should be defined');
    });

    it("expect value toBe(2)", () => {
        let twoValue = 2;
        expect(twoValue).toBe(2);
    });

    it("expect string toContain value ", () => {
        let testString = "12345a";
        expect(testString).toContain("a");
    });

    it("expect true to be truthy", () => {
        let trueValue = true;
        expect(trueValue).toBeTruthy();
    });

    it("expect false not to be truthy", () => {
        let falseValue = false;
        expect(falseValue).not.toBeTruthy();
    });

    it("expect value not to be null", () => {
        let definedValue = 2;
        expect(definedValue).not.toBeNull();
    });

    it("expect objects to be equal", () => {
        let obj1 = { a: 1, b: 2 };
        let obj2 = { b: 2, a: 1 };

        expect(obj1).toEqual(obj2);
    });
});

describe("beforeEach and afterEach tests", () => {
    let myString: string | undefined;
    beforeEach(() => {
        myString = "this is a string";
    });
    afterEach(() => {
        expect(myString).toBeUndefined();
    });
    it("should find then clear the myString varialbe", () => {
        expect(myString).toEqual("this is a string");
        myString = undefined;
    });
});

class InsertDataHelper {
    dataArray: string[] | undefined;
    setupTestData() {
        // insert data into database
        this.dataArray = [`a`, `b`, `c`];
    }
    tearDownTestData() {
        // remove all data from database
        this.dataArray = [];
    }
    getTestData() {
        return this.dataArray;
    }
}

describe("beforeAll and afterAll tests", () => {
    let dataHelper: InsertDataHelper;
    beforeAll(() => {
        dataHelper = new InsertDataHelper();
        dataHelper.setupTestData();
    });
    afterAll(() => {
        dataHelper.tearDownTestData();
    });
    it("should start with seeded data", () => {
        expect(dataHelper.getTestData()).toEqual([`a`, `b`, `c`]);
    });
});

// fdescribe("This is a forced suite", () => {
//     it("This is not a forced test", () => {
//         expect(true).toBeFalsy('true should be false');
//     });
//     fit("This is a forced test", () => {
//         expect(false).toBeFalsy();
//     })
// });

describe("skipped test examples", () => {
    xit("skipped test with no reason", () => {
        expect(false).toBeTruthy();
    });
    it("", () => {
        expect(false).toBeTruthy();
        pending("this test should be implemented correctly");
    })
});

function using(name: string, values: any[], func: Function) {
    for (var i = 0, count = values.length; i < count; i++) {
        func.apply(Object, values[i]);
    }
}

describe("data driven tests", () => {
    using("valid values", [
        "first string",
        "second_string",
        "!!string!!"
    ], (value: string) => {
        it(`${value} should contain 'string'`, () => {
            // console.log(`checking value : ${value}`);
            expect(value).toContain("string");
        });
    });
});

describe("data driven tests with arrays", () => {
    using("valid values", [
        ["first string", 'test'],
        ["second_string", "test second"]
    ], (value: string[]) => {

        it(`${value} should contain 'string'`, () => {
            expect(value.length).toBe(2);
        });
    });
});


class MySpiedClass {
    testFunction(arg1: string) {
        console.log(arg1);
    }
}
describe("simple spy", () => {
    it("should spyOn a function call", () => {
        let classInstance = new MySpiedClass();
        let testFunctionSpy
            = spyOn(classInstance, 'testFunction');

        classInstance.testFunction("test");

        expect(testFunctionSpy).toHaveBeenCalled();
    });
});

class CallbackClass {
    doCallback(id: number, callback: (result: string) => void) {
        callback(`id:${id}`);
    }
}

class DoCallback {
    logValue(value: string) {
        console.log(value);
    }
}

describe("using callback spies", () => {
    it("should execute callback with the correct string value",
        () => {
            let doCallback = new DoCallback();
            let classUnderTest = new CallbackClass();

            let callbackSpy = spyOn(doCallback, 'logValue');
            classUnderTest.doCallback(1, doCallback.logValue);

            expect(callbackSpy).toHaveBeenCalled();
            expect(callbackSpy).toHaveBeenCalledWith("id:1");

        });
});

class ClassToFake {
    getValue(): number {
        return 2;
    }
}
describe("using fakes", () => {
    it("calls fake instead of real function", () => {
        let classToFake = new ClassToFake();
        spyOn(classToFake, 'getValue').and.callFake(() => {
            return 5;
        });
        expect(classToFake.getValue()).toBe(5);
    });
});

// Asynchronous tests
// ------------------

class MockAsyncClass {
    executeSlowFunction(success: (value: string) => void) {
        setTimeout(() => {
            success("success");
        }, 1000);
    }
}

describe("asynchronous tests", () => {
    it("failing test", () => {

        pending("this test will always fail");

        let mockAsync = new MockAsyncClass();
        let returnedValue!: string;
        console.log(`1. calling executeSlowFunction`);
        mockAsync.executeSlowFunction((value: string) => {
            console.log(`2. executeSlowFunction returned`);
            returnedValue = value;
        });
        console.log(`3. checking returnedValue`);
        expect(returnedValue).toEqual("success");
    });

});

describe("asynch tests with done", () => {
    let returnedValue!: string;

    beforeEach((done) => {
        returnedValue = "no_return_value";
        let mockAsync = new MockAsyncClass();
        console.log(`1. calling executeSlowFunction`);
        mockAsync.executeSlowFunction((value: string) => {
            console.log(`2. executeSlowFunction returned`);
            returnedValue = value;
            done();
        });
    });

    it("should return success after 1 second", (done) => {
        console.log(`3. checking returnedValue`);
        expect(returnedValue).toEqual("success");
        done();
    });
});

class MockAsyncWithPromiseClass {
    delayedPromise(): Promise<string> {
        return new Promise<string>
            ((resolve: (str: string) => void,
                reject: (str: string) => void
            ) => {
                function afterTimeout() {
                    console.log(`2. resolving promise`);
                    resolve('success');
                }
                setTimeout(afterTimeout, 1000);
            });
    }
}


describe("async test with async keyword", () => {
    it("should wait for async to return with value ", async () => {
        let mockAsyncWithPromise = new MockAsyncWithPromiseClass();
        let returnedValue!: string;
        console.log(`1. calling delayedPromise`);
        returnedValue = await mockAsyncWithPromise.delayedPromise();
        console.log(`3. checking returnedValue`);
        expect(returnedValue).toEqual("success");
    });
});

