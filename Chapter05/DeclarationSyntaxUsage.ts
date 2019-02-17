trace("this is a string");
trace(true);
trace(1);
trace ({id: 1, name : "test"});

FirstNamespace.SecondNamespace.ThirdNamespace.log("test");

var myClass = new MyClass();

var myNestedClass = new OuterName.InnerName.NestedClass();

var myClassConstr = new MyClassConstructor();
var myClassConstr2 = new MyClassConstructor(1);

var classWithProperty = new ClassWithProperty();
classWithProperty.id = 1;

var classWithFunction = new ClassWithFunction();
classWithFunction.functionToRun();

StaticClass.staticId = 1;
StaticClass.staticFunction();

globalLogError("test");

describe("test", () => {
    
} );

var classWithOpt = new ClassWithOptionals();
var classWithOpt1 = new ClassWithOptionals(
    {id: 1});
var classWithOpt2 = new ClassWithOptionals(
    {name: 'test'});
var classWithOpt3 = new ClassWithOptionals(
    {id: 1, name: 'test'});

fnWithProperty(1);
fnWithProperty.name = "name";