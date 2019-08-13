// RiveScript.js

// This code is released under the MIT License.
// See the "LICENSE" file for more information.

// http://www.rivescript.com/
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSObjectHandler;

/**
JSObjectHandler (RiveScript master)

JavaScript Language Support for RiveScript Macros. This support is enabled by
default in RiveScript.js; if you don't want it, override the `javascript`
language handler to null, like so:

```javascript
bot.setHandler("javascript", null);
```
*/
JSObjectHandler = function () {
	function JSObjectHandler(master) {
		_classCallCheck(this, JSObjectHandler);

		this._master = master;
		this._objects = {};

		// Test for async function support.
		this._async = "";
		try {
			eval("(async function() {})");
			this._async = "async ";
		} catch (e) {}
	}

	/**
 void load (string name, string[]|function code)
 	Called by the RiveScript object to load JavaScript code.
 */


	_createClass(JSObjectHandler, [{
		key: "load",
		value: function load(name, code) {
			var e, source;
			if (typeof code === "function") {
				// If code is just a js function, store the reference as is
				return this._objects[name] = code;
			} else {
				// We need to make a dynamic JavaScript function.
				source = "this._objects[\"" + name + "\"] = " + this._async + "function(rs, args) {\n" + code.join("\n") + "\n};\n";
				try {
					return eval(source);
				} catch (error) {
					e = error;
					return this._master.warn("Error evaluating JavaScript object: " + e.message);
				}
			}
		}

		/**
  string call (RiveScript rs, string name, string[] fields)
  	Called by the RiveScript object to execute JavaScript code.
  */

	}, {
		key: "call",
		value: function call(rs, name, fields, scope) {
			var e, func, reply;
			// We have it?
			if (!this._objects[name]) {
				return this._master.errors.objectNotFound;
			}
			// Call the dynamic method.
			func = this._objects[name];
			reply = "";
			try {
				reply = func.call(scope, rs, fields);
			} catch (error) {
				e = error;
				reply = "[ERR: Error when executing JavaScript object: " + e.message + "]";
			}
			// Allow undefined responses.
			if (reply === void 0) {
				reply = "";
			}
			return reply;
		}
	}]);

	return JSObjectHandler;
}();

module.exports = JSObjectHandler;