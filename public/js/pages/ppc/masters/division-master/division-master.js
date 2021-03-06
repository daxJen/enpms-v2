/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime-module.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime-module.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./resources/assets/js/pages/ppc/masters/division-master/division-master.js":
/*!**********************************************************************************!*\
  !*** ./resources/assets/js/pages/ppc/masters/division-master/division-master.js ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dataColumn = [{
  data: function data(_data) {
    return '<input type="checkbox" class="table-checkbox check_item" value="' + _data.id + '">';
  },
  name: 'id',
  orderable: false,
  searchable: false,
  width: '5.5%'
}, {
  data: 'action',
  name: 'action',
  orderable: false,
  searchable: false,
  width: '5.5%'
}, {
  data: 'div_code',
  name: 'div_code',
  width: '12.5%'
}, {
  data: 'div_name',
  name: 'div_name',
  width: '21.5%'
}, {
  data: 'plant',
  name: 'plant',
  width: '12.5%'
}, {
  data: 'leader',
  name: 'leader',
  width: '12.5%'
}, {
  data: 'updated_at',
  name: 'updated_at',
  width: '17.5%'
}, {
  data: function data(_data2) {
    var enable_disable;
    var bg_color = "";

    if (_data2.is_disable == 0) {
      enable_disable = "Set to Disable";
      bg_color = "btn-danger";
    } else {
      enable_disable = "Set to Enable";
      bg_color = "btn-primary";
    }

    return '<button type="button" class="btn ' + bg_color + ' btn_enable_disable" data-id="' + _data2.id + '">' + enable_disable + '</button>';
  },
  name: '',
  orderable: false,
  searchable: false,
  width: '12.5%'
}];
var process_arr = [];
var view_process_arr = [];
var productline_arr = [];
$(function () {
  init();
  $('.validate').on('keyup', function (e) {
    var no_error = $(this).attr('id');
    hideErrors(no_error);
  });
  $('.select-validate').on('change', function (e) {
    var no_error = $(this).attr('id');
    hideErrors(no_error);
  });
  $('#frm_division').on('submit', function (e) {
    $('.loadingOverlay').show();
    e.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      dataType: 'JSON',
      data: {
        id: $('#id').val(),
        div_code: $('#div_code').val(),
        div_name: $('#div_name').val(),
        plant: $('#plant').val(),
        leader: $('#leader').val(),
        user_id: $('#user_id').val(),
        processes: $('input[name="processes[]"]').map(function () {
          return $(this).val();
        }).get(),
        productlines: $('input[name="productline[]"]').map(function () {
          return $(this).val();
        }).get()
      }
    }).done(function (data, textStatus, xhr) {
      view_process_arr = [];
      process_arr = [];
      addProcess();

      if (textStatus) {
        getProcess(data.id);

        if (data.status == "failed") {
          msg(data.msg, data.status);
        } else {
          msg("Division data was successfully saved.", textStatus);
        } // getDatatable('tbl_division', divListURL, dataColumn, [], 0);


        divisionTable();
        view_div();
        clear();
      }
    }).fail(function (xhr, textStatus, errorThrown) {
      var errors = xhr.responseJSON.errors;
      showErrors(errors);
    }).always(function (xhr, textStatus) {
      $('.loadingOverlay').hide();
    });
  });
  $('#tbl_division_body').on('click', '.btn_edit_div', function (e) {
    e.preventDefault();
    show();
    $('#id').val($(this).attr('data-id'));
    $('#div_code').val($(this).attr('data-div_code'));
    $('#div_name').val($(this).attr('data-div_name'));
    $('#plant').val($(this).attr('data-plant'));
    $('#process').val($(this).attr('data-process'));
    $('#leader').val($(this).attr('data-leader')).trigger('change');
    $('#user_id').val($(this).attr('data-user_id'));
    process_arr = [];
    productline_arr = [];
    view_process_arr = [];
    $('#tbl_process_body').html('<tr><td colspan="3">No data displayed.</td></tr>');
    $('#tbl_prodlines_body').html('<tr><td colspan="3">No data displayed.</td></tr>');
    getProcess($(this).attr('data-id'));
    getProductline($(this).attr('data-id'));
  });
  $('#tbl_division_body').on('click', '.btn_enable_disable', function (e) {
    var data_id = $(this).attr('data-id');
    $.ajax({
      url: disableEnableDivisionURL,
      type: 'POST',
      dataType: 'JSON',
      data: {
        _token: token,
        id: data_id
      }
    }).done(function (data, txtStatus, xhr) {
      divisionTable();
    }).fail(function (xhr, txtStatus, errorThrown) {
      console.log(errorThrown);
    });
  });
  $('#btn_delete').on('click', function (e) {
    delete_items('.check_item', divDeleteURL);
  });
  $('#btn_clear').on('click', function (e) {
    clear();
    process_arr = [];
    productline_arr = [];
    $('#tbl_process_body').html('<tr><td colspan="3">No data displayed.</td></tr>');
    $('#tbl_prodlines_body').html('<tr><td colspan="3">No data displayed.</td></tr>');
  });
  $('#btn_cancel').on('click', function (e) {
    cancel();
    process_arr = [];
    productline_arr = [];
    viewProcess(process_arr);
    $('#tbl_process_body').html('<tr><td colspan="3">No data displayed.</td></tr>');
    $('#tbl_prodlines_body').html('<tr><td colspan="3">No data displayed.</td></tr>');
  });
  $('#leader').on('change', function () {
    $('#user_id').val($(this).val()); // $.ajax({
    // 	url: getuserIDURL,
    // 	type: 'GET',
    // 	dataType: 'JSON',
    // 	data: {
    // 		_token: token,
    // 		leader_name: $(this).val()
    // 	},
    // }).done(function (data, textStatus, xhr) {
    // 	$('#user_id').val(data.id);
    // }).fail(function (xhr, textStatus, errorThrown) {
    // 	msg(errorThrown, textStatus);
    // });
  });
  $('#btn_process').on('click', function () {
    $('#modal_process').modal('show');
  });
  $('#btn_prodline').on('click', function () {
    $('#modal_prodline').modal('show');
  });
  $('#btn_add_process').on('click', function () {
    if ($('#process').val() == "") {
      msg("The Process field is required.", "failed");
    } else {
      if (process_arr.indexOf($('#process').val()) != -1) {
        msg("The Process already existing.", "failed");
      } else {
        process_arr.push($('#process').val());
        addProcess(process_arr);
      }
    }
  });
  $('#tbl_process_body').on('click', '.btn_remove_process', function () {
    var count = $(this).attr('data-count');
    $('#' + count).remove();
    count--;
    process_arr.splice(count, 1);
    addProcess(process_arr);

    if ($('#tbl_process_body > tr').length < 1) {
      $('#tbl_process_body').html('<tr>' + '<td colspan="3" class="text-center">No data displayed.</td>' + '</tr>');
    }
  }); //division master productline 

  $('#btn_add_prod_lines').on('click', function () {
    if ($('#prod_lines').val() != "") {
      if (!productline_arr.includes($('#prod_lines').val())) {
        productline_arr.push($('#prod_lines').val());
        addProductline(productline_arr);
      } else {
        msg("The Productline already existing.", "failed");
      }
    } else {
      msg("The Productline field is required.", "failed");
    }
  });
  $('#tbl_prodlines_body').on('click', '.btn_remove_pline', function () {
    var count = $(this).attr('pline-data-count');
    $('#' + count).remove();
    count--;
    productline_arr.splice(count, 1);
    addProductline(productline_arr);

    if ($('#tbl_prodlines_body > tr').length < 1) {
      $('#tbl_prodlines_body').html('<tr>' + '<td colspan="3" class="text-center">No data displayed.</td>' + '</tr>');
    }
  });
  $('#btn_add').on('click', function () {
    if ($('#id').val() == '') {
      new_div();
    } else {
      update();
    }
  });
  $('#tbl_division').on('click', 'th:first-child', function () {
    if ($('.check_all').is(':checked')) {
      $('.btn_edit_div').prop('disabled', true);
      $('#tbl_division_body .btn_enable_disable').prop('disabled', true);
    } else {
      $('.btn_edit_div').prop('disabled', false);
      $('#tbl_division_body .btn_enable_disable').prop('disabled', false);
    }
  });
  $('#tbl_division_body').on('click', 'td:first-child', function () {
    if ($('#tbl_division_body .dt-checkboxes').is(':checked')) {
      $('.btn_edit_div').prop('disabled', false);
      $('#tbl_division_body .btn_enable_disable').prop('disabled', false);
    } else {
      $('.btn_edit_div').prop('disabled', true);
      $('#tbl_division_body .btn_enable_disable').prop('disabled', true);
    }
  });
  $('#tbl_division_body').on('change', '.dt-checkboxes', function () {
    if ($(this).is(':checked')) {
      $('.btn_edit_div').prop('disabled', true);
      $('#tbl_division_body .btn_enable_disable').prop('disabled', true);
    } else {
      $('.btn_edit_div').prop('disabled', false);
      $('#tbl_division_body .btn_enable_disable').prop('disabled', false);
    }
  });
});

function init() {
  if (permission_access == '2' || permission_access == 2) {
    $('.permission').prop('readonly', true);
    $('.permission-button').prop('disabled', true);
  } else {
    $('.permission').prop('readonly', false);
    $('.permission-button').prop('disabled', false);
  }

  view_div();
  get_dropdown_productline();
  getLeaders();
  viewProcess(view_process_arr); // getDatatable('tbl_division', divListURL, dataColumn, [], 0);

  divisionTable();
  get_dropdown_items_by_id(1, '#process');
  checkAllCheckboxesInTable('#tbl_division', '.check_all', '.check_item');
}

function divisionTable() {
  $('#tbl_division').dataTable().fnClearTable();
  $('#tbl_division').dataTable().fnDestroy();
  $('#tbl_division').dataTable({
    ajax: {
      url: divListURL,
      error: function error(xhr, textStatus, errorThrown) {
        ErrorMsg(xhr);
      }
    },
    stateSave: true,
    serverSide: true,
    processing: true,
    deferRender: true,
    language: {
      aria: {
        sortAscending: ": activate to sort column ascending",
        sortDescending: ": activate to sort column descending"
      },
      emptyTable: "No data available in table",
      info: "Showing _START_ to _END_ of _TOTAL_ records",
      infoEmpty: "No records found",
      infoFiltered: "(filtered1 from _MAX_ total records)",
      lengthMenu: "Show _MENU_",
      search: "Search:",
      zeroRecords: "No matching records found",
      paginate: {
        "previous": "Prev",
        "next": "Next",
        "last": "Last",
        "first": "First"
      }
    },
    columnDefs: [{
      targets: 0,
      checkboxes: {
        selectRow: true
      }
    }],
    select: {
      selector: 'td:not(:nth-child(2)):not(:nth-child(3)):not(:nth-child(4)):not(:nth-child(5)):not(:nth-child(6)):not(:nth-child(7)):not(:nth-child(8))',
      style: 'multi'
    },
    columns: [{
      data: function data(_data3) {
        return '<input type="checkbox" class="table-checkbox check_item" value="' + _data3.id + '">';
      },
      name: 'id',
      orderable: false,
      searchable: false,
      width: '5.5%'
    }, {
      data: 'action',
      name: 'action',
      orderable: false,
      searchable: false,
      width: '5.5%'
    }, {
      data: 'div_code',
      name: 'div_code',
      width: '12.5%'
    }, {
      data: 'div_name',
      name: 'div_name',
      width: '21.5%'
    }, {
      data: 'plant',
      name: 'plant',
      width: '12.5%'
    }, {
      data: 'leader',
      name: 'leader',
      width: '19.5%'
    }, {
      data: 'updated_at',
      name: 'updated_at',
      width: '17.5%'
    }, {
      data: function data(_data4) {
        var enable_disable;
        var bg_color = "";

        if (_data4.is_disable == 0) {
          enable_disable = "<i class='fa fa-ban'></i>";
          bg_color = "btn-danger";
        } else {
          enable_disable = "<i class='fa fa-toggle-on'></i>";
          bg_color = "btn-primary";
        }

        return '<button type="button" class="btn ' + bg_color + ' btn_enable_disable" data-id="' + _data4.id + '" ' + 'data-disabled="' + _data4.is_disable + '" ' + 'data-toggle="popover" ' + 'data-content="This Button is to Disable / Enable ' + _data4.div_name + '" ' + 'data-placement="right" ' + '>' + enable_disable + '</button>';
      },
      name: '',
      orderable: false,
      searchable: false,
      width: '5.5%'
    }],
    order: [[6, 'desc']],
    initComplete: function initComplete() {
      $('.btn_edit_div').popover({
        trigger: 'hover focus'
      });
      $('.btn_enable_disable').popover({
        trigger: 'hover focus'
      });
      $('#tbl_division .dt-checkboxes-select-all input[type=checkbox]').addClass('table-checkbox check_all');
    },
    fnDrawCallback: function fnDrawCallback() {},
    createdRow: function createdRow(row, data, dataIndex) {
      if (data.is_disable == 1) {
        $(row).css('background-color', '#ff6266');
        $(row).css('color', '#fff');
      }

      var dataRow = $(row);
      var checkbox = $(dataRow[0].cells[0].firstChild);
      checkbox.attr('data-id', data.id);
      checkbox.addClass('table-checkbox check_item');
    }
  });
}

function get_dropdown_productline() {
  return _get_dropdown_productline.apply(this, arguments);
}

function _get_dropdown_productline() {
  _get_dropdown_productline = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var items, opt, promise, result;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            items = [];
            opt = "<option value=''></option>";
            $("#prod_lines").html(opt);
            promise = $.ajax({
              url: dropdownProduct,
              type: 'GET',
              dataType: 'JSON',
              data: {
                _token: token
              }
            }).done(function (data, textStatus, xhr) {
              items = data;
            }).fail(function (xhr, textStatus, errorThrown) {
              msg(errorThrown, textStatus);
              items = [];
            });
            _context.next = 6;
            return promise;

          case 6:
            result = _context.sent;
            $.each(result, function (i, x) {
              opt = "<option value='" + x.dropdown_item + "'>" + x.dropdown_item + "</option>";
              $("#prod_lines").append(opt);
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _get_dropdown_productline.apply(this, arguments);
}

function clear() {
  $('.clear').val('');
  $('#leader').val(null).trigger('change');
}

function view_div() {
  $('#id').val('');
  $('#btn_save').html('<i class="fa fa-floppy-o"></i> Save');
  $('#btn_save').removeClass('bg-green');
  $('#btn_save').addClass('bg-blue');
  $('#btn_add').html('<i class="fa fa-plus"></i> Add New');
  $('#btn_add_div').show();
  $('#btn_save_div').hide();
  $('#btn_cancel_div').hide();
  $('#btn_clear_div').hide();
  $('#btn_delete_div').show();
  $('.readonly').prop('disabled', true);
  $('.dt-checkboxes-select-all input[type=checkbox]').prop('disabled', false);
  $('.dt-checkboxes').prop('disabled', false);
  $('.btn_edit_div').prop('disabled', false);
  $('.btn_enable_disable').prop('disabled', false);
  $('#btn_process').prop('disabled', true);
  $('#btn_prodline').prop('disabled', true);
}

function new_div() {
  $('#id').val('');
  $('#btn_save').html('<i class="fa fa-floppy-o"></i> Save');
  $('#btn_save').removeClass('bg-purple');
  $('#btn_save').addClass('bg-blue');
  $('#btn_add_div').hide();
  $('#btn_save_div').show();
  $('#btn_cancel_div').show();
  $('#btn_clear_div').show();
  $('#btn_delete_div').hide();
  $('.readonly').prop('disabled', false);
  $('.dt-checkboxes-select-all input[type=checkbox]').prop('disabled', true);
  $('.dt-checkboxes').prop('disabled', true);
  $('.btn_edit_div').prop('disabled', true);
  $('.btn_enable_disable').prop('disabled', true);
  $('#btn_process').prop('disabled', false);
  $('#btn_prodline').prop('disabled', false);
}

function cancel() {
  clear();
  view_div(); // $('#btn_save').html("<i class='fa fa-floppy-o'></i> Save");
  // $('#btn_save').removeClass('bg-green');
  // $('#btn_save').addClass('bg-blue');
  // $('#btn_cancel').hide();
  // $('#btn_cancel_div').hide();
  // $('#btn_clear').show();
  // $('#btn_delete').show();
  // $('#btn_clear_div').show();
  // $('#btn_delete_div').show();
}

function show() {
  $('#btn_save').html('<i class="fa fa-floppy-o"></i> Save');
  $('#btn_save').removeClass('bg-green');
  $('#btn_save').addClass('bg-blue');
  $('#btn_add').html('<i class="fa fa-edit"></i> Edit');
  $('#btn_add_div').show();
  $('#btn_save_div').hide();
  $('#btn_cancel_div').show();
  $('#btn_clear_div').hide();
  $('#btn_delete_div').hide();
  $('.readonly').prop('disabled', true);
  $('.dt-checkboxes-select-all input[type=checkbox]').prop('disabled', true);
  $('.dt-checkboxes').prop('disabled', true);
  $('.btn_edit_div').prop('disabled', false);
  $('.btn_enable_disable').prop('disabled', false);
  $('#btn_process').prop('disabled', true);
  $('#btn_prodline').prop('disabled', true);
}

function update() {
  $('#btn_save').html("<i class='fa fa-check'></i> Update");
  $('#btn_save').removeClass('bg-blue');
  $('#btn_save').addClass('bg-purple');
  $('#btn_add_div').hide();
  $('#btn_clear_div').hide();
  $('#btn_delete_div').hide();
  $('#btn_cancel_div').show();
  $('#btn_save_div').show();
  $('.readonly').prop('disabled', false);
  $('.dt-checkboxes-select-all input[type=checkbox]').prop('disabled', true);
  $('.dt-checkboxes').prop('disabled', true);
  $('.btn_edit_div').prop('disabled', true);
  $('.btn_enable_disable').prop('disabled', true);
  $('#btn_process').prop('disabled', false);
  $('#btn_prodline').prop('disabled', false);
}

function delete_items(checkboxClass, deleteURL) {
  var chkArray = [];
  $(checkboxClass + ":checked").each(function () {
    chkArray.push($(this).attr('data-id'));
  });

  if (chkArray.length > 0) {
    // confirm_delete(chkArray, token, deleteURL, true, 'tbl_division', divListURL, dataColumn);
    $('.loadingOverlay').show();
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover your data!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f95454",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: true,
      closeOnCancel: false
    }, function (isConfirm) {
      if (isConfirm) {
        $.ajax({
          url: deleteURL,
          type: 'POST',
          dataType: 'JSON',
          data: {
            _token: token,
            id: chkArray
          }
        }).done(function (data, textStatus, xhr) {
          msg(data.msg, data.status);
          divisionTable();
        }).fail(function (xhr, textStatus, errorThrown) {
          ErrorMsg(xhr);
        }).always(function () {
          $('.loadingOverlay').hide();
        });
      } else {
        $('.loadingOverlay').hide();
        $('.check_all').click();
        swal("Cancelled", "Your data is safe and not deleted.");
      }
    });
  } else {
    msg("Please select at least 1 item.", "warning");
  }

  $('.check_all').prop('checked', false);
}

function addProcess(arr) {
  var tbl = '';
  $('#tbl_process_body').html(tbl);
  var cnt = 1;
  $.each(arr, function (i, x) {
    tbl = '<tr id="' + cnt + '">' + '<td>' + cnt + '</td>' + '<td>' + x + '<input type="hidden" name="processes[]" value="' + x + '">' + '</td>' + '<td>' + '<span class="btn_remove_process" data-count="' + cnt + '">' + '<i class="text-red fa fa-times"></i>' + '</span>' + '</td>' + '</tr>';
    $('#tbl_process_body').append(tbl);
    cnt++;
  });
}

function addProductline(arr) {
  var tbl = '';
  $('#tbl_prodlines_body').html(tbl);
  var cnt = 1;
  $.each(arr, function (i, x) {
    tbl = '<tr id="' + cnt + '">' + '<td>' + cnt + '</td>' + '<td>' + x + '<input type="hidden" name="productline[]" value="' + x + '">' + '</td>' + '<td>' + '<span class="btn_remove_pline" pline-data-count="' + cnt + '">' + '<i class="text-red fa fa-times"></i>' + '</span>' + '</td>' + '</tr>';
    $('#tbl_prodlines_body').append(tbl);
    cnt++;
  });
}

function viewProcess(arr) {
  $('#tbl_view_process').dataTable().fnClearTable();
  $('#tbl_view_process').dataTable().fnDestroy();
  $('#tbl_view_process').dataTable({
    data: arr,
    bLengthChange: false,
    searching: false,
    paging: false,
    columns: [{
      data: 'process'
    }]
  });
}

function getProcess(id) {
  $.ajax({
    url: getProcessURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token,
      division_id: id
    }
  }).done(function (data, textStatus, xhr) {
    $.each(data, function (i, x) {
      process_arr.push(x.process);
      view_process_arr.push({
        process: x.process
      });
    });
    addProcess(process_arr);
    viewProcess(view_process_arr);
  }).fail(function (xhr, textStatus, errorThrown) {
    msg(errorThrown, textStatus);
  });
}

function getProductline(id) {
  $.ajax({
    url: getProductlineURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token,
      division_id: id
    }
  }).done(function (data, textStatus, xhr) {
    $.each(data, function (i, x) {
      productline_arr.push(x.productline);
    });
    addProductline(productline_arr);
  }).fail(function (xhr, textStatus, errorThrown) {
    msg(errorThrown, textStatus);
  });
}

function getLeaders() {
  // var opt = "<option value=''></option>";
  // $(el).html(opt);
  $.ajax({
    url: getLeaderURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token
    }
  }).done(function (data, textStatus, xhr) {
    $('#leader').select2({
      allowClear: true,
      placeholder: 'Select a Leader',
      data: data
    }).val(null).trigger('change'); // $('#leader').val(null).trigger('change');
    // $.each(data, function(i, x) {
    // 	opt = "<option value='"+x.name+"'>"+x.name+"</option>";
    // 	$(el).append(opt);
    // });
  }).fail(function (xhr, textStatus, errorThrown) {
    console.log("error");
  });
}

/***/ }),

/***/ 12:
/*!****************************************************************************************!*\
  !*** multi ./resources/assets/js/pages/ppc/masters/division-master/division-master.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\en-pms\resources\assets\js\pages\ppc\masters\division-master\division-master.js */"./resources/assets/js/pages/ppc/masters/division-master/division-master.js");


/***/ })

/******/ });