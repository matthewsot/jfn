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

testFunction("Hello!"); //String: Hello!
testFunction(1); //Num: 1
```