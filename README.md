# jfn
Playing around with Javascript functions.

A global overloadable function:

```
jfn.defineFunction("testFunction", ["string"], function (str) {
    return "String: " + str;
});

jfn.defineFunction("testFunction", ["number"], function (num) {
    return "Num: " + num;
});

jfn.defineFunction("testFunction", "*", function (data) {
    return "Catchall: " + JSON.stringify(data);
});

testFunction("Hello!"); //String: Hello!
testFunction(1); //Num: 1
testFunction({ "property": "value" }); //Catchall: {"property":"value"}
```

Default values are also possible:

```
// Returns the root of a number, defaulting to the square root
jfn.defineFunction(Math, "root", ["number", "number"], [2], function (base, power) {
    return Math.pow(base, (1 / power));
});

Math.root(8, 3); //2 (cubed root of 8)
Math.root(9); //3 (square root of 9)
```

jfn.defineFunction arguments:
```
jfn.defineFunction(object, propertyName, argumentTypes, defaults, function);
```

``object`` is the object you'd like to define the function on (leave it out to define on the global ``window`` object)

``propertyName`` is the name of the function that you'd like to define on ``object``

``argumentTypes`` is an array of argument types to match this function with. Pass "*" to have a catchall function.

``defaults`` is an array of default values. Note that the last value in ``defaults`` acts as the default value for the last argument specified in ``argumentTypes``

``function`` is the function to run
