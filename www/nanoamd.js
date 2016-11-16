/**
 * Nanoamd is a very small Asynchronous Module Loader
 * It works well with typescript's' module:amd and outFile settings
 * It assumes all modules are named
 * It also assumes all dependencies will eventually load from script. They are not downloaded.
 */

function define(name, deps, def) {
    const exportIndex = deps.indexOf("exports")
    Promise.all(deps.map(define.load)).then(function (depsResolved) {
        try { def.apply(this, depsResolved) }
        catch (e) { console.error(`Error loading module:${name}`, e.stack) }
        define.resolve(name, exportIndex >= 0 ? depsResolved[exportIndex] : {})
    })
}

define.load = function load(name) {
    if (name == "exports") { // exports is always a new object
        return Promise.resolve({})
    } else if (define.resolved[name]) {
        return Promise.resolve(define.resolved[name])
    } else if (define.promises[name]) {
        return define.promises[name]
    } else {
        let _resolve; // Create a resolvable promise
        const promise = define.promises[name] = new Promise(function (resolve) { _resolve = resolve })
        promise.resolve = _resolve
        return promise
    }
}

define.promises = {}
define.resolved = {
    require: function require(name) {
        return define.resolved[name]
    }
}

define.resolve = function resolve(name, exports) {
    define.resolved[name] = exports
    if (define.promises[name]) {
        define.promises[name].resolve(exports)
        delete define.promises[name]
    }
}

define.amd = true