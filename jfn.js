var jfn = {};

//The proxy function is the function that is actually called by the user -
//it then looks over all of the "sub-functions" stored in the .__jfn.fns array
//to pick the right one to call
jfn.createProxyFunction = function (name) {
    return function () {
        var jfns = this[name]["__jfn"]["fns"];
        
        args = Array.slice(arguments);
        
        for (var i = 0; i < jfns.length; i++) {
            var jfn = jfns[i];
            
            var matches = args.length <= jfn.args.length;
            for (var a = 0; a < args.length; a++) {
                matches = jfn.args[a] === "*" || jfn.args[a] === (typeof args[a]);
                if (!matches) {
                    break;
                }
            }
            
            if (matches) {
                var argIndex = jfn.args.length;
                for (var d = (jfn.defaults.length - 1); d >= 0; d--) {
                    argIndex = argIndex - 1;
                    
                    if (typeof args[argIndex] === "undefined") {
                        args[argIndex] = jfn.defaults[d];
                    }
                }
                
                return jfn.fn.apply(this, args);
            }
        }
        
        //No match found!
        if (this[name]["__jfn"].hasOwnProperty("default")) {
            return this[name]["__jfn"]["default"].apply(this, args);
        }
    };
};

jfn.defineFunction = function (object, name, args, defaults, fn) {
    if (typeof object === "string") {
        fn = defaults;
        defaults = args;
        args = name;
        name = object;
        object = window;
    }
    
    if (typeof args === "function") {
        fn = args;
        defaults = [];
        args = [];
    }
    
    if (typeof defaults === "function") {
        fn = defaults;
        defaults = [];
    }
    
    if (!object.hasOwnProperty(name)) {
        object[name] = jfn.createProxyFunction(name);
    }
    
    if (!object[name].hasOwnProperty("__jfn")) {
        object[name]["__jfn"] = { "fns": [] };
    } else if (args !== "*") {
        //Remove any existing functions with the same arguments.
        //Essentially, conflict resolution here is that functions added
        //later replace those added earlier.
        for (var i = 0; i < object[name]["__jfn"]["fns"].length; i++) {
            var f = object[name]["__jfn"]["fns"][i];
            if (JSON.stringify(f.args) === JSON.stringify(args)) {
                object[name]["__jfn"]["fns"].splice(i, 1);
                break;
            }
        }
    }
    
    if (args === "*") {
        object[name]["__jfn"]["default"] = fn;
        return;
    }
    
    object[name]["__jfn"]["fns"].push({
        args: args,
        defaults: defaults,
        fn: fn
    });
};
