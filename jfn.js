var jfn = {};

jfn.getProxyFunction = function (name) {
    return function () {
        var jfns = this[name]["__jfn"]["fns"];
        
        for (var i = 0; i < jfns.length; i++) {
            var jfn = jfns[i];
            
            var matches = arguments.length === jfn.args.length;
            for (var a = 0; a < jfn.args.length; a++) {
                matches = jfn.args[a] === (typeof arguments[a]);
                if (!matches) {
                    break;
                }
            }
            
            if (matches) {
                jfn.fn.apply(this, arguments);
                return;
            }
        }
    };
};

jfn.defineFunction = function (object, name, args, fn) {
    if (typeof object === "string") {
        fn = args;
        args = name;
        name = object;
        object = window;
    }
    
    if (!object.hasOwnProperty(name)) {
        object[name] = jfn.getProxyFunction(name);
    }
    
    if (!object[name].hasOwnProperty("__jfn")) {
        object[name]["__jfn"] = { "fns": [] };
    } else {
        for (var i = 0; i < object[name]["__jfn"]["fns"].length; i++) {
            var f = object[name]["__jfn"]["fns"][i];
            if (JSON.stringify(f.args) === JSON.stringify(args)) {
                object[name]["__jfn"]["fns"].splice(i, 1);
                return;
            }
        }
    }
    
    object[name]["__jfn"]["fns"].push({
        args: args,
        fn: fn
    });
};