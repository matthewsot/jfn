# jfn
Playing around with Javascript functions

A global overloadable function:

```
jfn.defineFunction("testFunction", ["string"], function (str) {
    alert("String: " + str);
});

jfn.defineFunction("testFunction", ["number"], function (num) {
    alert("Num: " + num);
});

jfn.defineFunction("testFunction", "*", function (data) {
    alert("Catchall: " + JSON.stringify(data));
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

alert(Math.root(8, 3)); //2 (cubed root of 8)
alert(Math.root(9)); //3 (square root of 9)
```