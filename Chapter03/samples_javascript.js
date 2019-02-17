console.log('hello_ch03_javascript');

function TestClosure(value) {
    this._value = value;
    function printValue() {
        console.log(this._value);
    }
    return printValue();
}

var myClosure = TestClosure(12);
myClosure;

var BaseClassWithConstructor = (function () {
    function BaseClassWithConstructor(_id) {
        this.id = _id;
    }
    return BaseClassWithConstructor;
}());