// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var noop = function () {
	var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(resp) {
		return regeneratorRuntime.wrap(function _callee25$(_context25) {
			while (1) {
				switch (_context25.prev = _context25.next) {
					case 0:
						return _context25.abrupt("return", new Promise(function (resolve, reject) {
							resolve(resp);
						}));

					case 1:
					case "end":
						return _context25.stop();
				}
			}
		}, _callee25, this);
	}));

	return function noop(_x28) {
		return _ref25.apply(this, arguments);
	};
}();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require("./utils");

/**
SessionManager

This is the interface for session managers that store user variables for
RiveScript. User variables include those set with the `<set>` tag or the
`setUservar()` function, as well as recent reply history and private internal
state variables.

The default session manager keeps the variables in memory. This means the bot
doesn't remember users after you restart the program; but the functions
`getUservars()` and `setUservars()` are available to export and import the
variables yourself.

If you prefer a more active session manager that stores and retrieves user
variables from a MySQL, MongoDB or Redis database, you can replace the default
session manager with one that implements that backend (or write one yourself
that implements this SessionManager API).

To use a session manager, you'd typically do something like:

```javascript
const RedisSessions = require("rivescript-contrib-redis");

// Provide the sessionManager option to use this instead of
// the default MemorySessionManager.
var bot = new RiveScript({
	sessionManager: new RedisSessions("localhost:6379")
});
```

To implement your own session manager, you should extend the
`SessionManager` class and implement a compatible object.
*/

var SessionManager = function () {
	function SessionManager() {
		_classCallCheck(this, SessionManager);
	}

	_createClass(SessionManager, [{
		key: "set",

		/**
  void set(string username, object data)
  	Set user variables for the user `username`. The `args` should be an object
  of key/value pairs. The values are usually strings, but they can be other
  types as well (e.g. arrays or other objects) for some internal data
  structures such as input/reply history.
  	A value of `null` for a variable means it should be deleted from the
  user's session store.
  */
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, data) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function set(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return set;
		}()

		/**
  async get(string username, string key) -> string
  	Retrieve a stored variable for a user.
  	If the user doesn't exist, this should resolve `null`. If the user *does*
  exist, but the key does not, this function should resolve the
  string value `"undefined"`.
  */

	}, {
		key: "get",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, key) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function get(_x3, _x4) {
				return _ref2.apply(this, arguments);
			}

			return get;
		}()

		/**
  async getAny(string username) -> object
  	Retrieve all stored user variables for the user `username`.
  	This should resolve an object of the key/value pairs you have stored for
  the user. If the user doesn't exist, resolve `null`.
  */

	}, {
		key: "getAny",
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username) {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function getAny(_x5) {
				return _ref3.apply(this, arguments);
			}

			return getAny;
		}()

		/**
  async getAll() -> object
  	Retrieve all variables about all users.
  	This should return an object that maps usernames to an object of their
  variables. For example:
  	```json
  { "user1": {
      "topic": "random",
         "name": "Alice"
    },
    "user2": {
      "topic": "random",
      "name": "Bob"
    }
  }
  ```
  */

	}, {
		key: "getAll",
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function getAll() {
				return _ref4.apply(this, arguments);
			}

			return getAll;
		}()

		/**
  async reset(string username)
  	Reset all variables stored about a particular user.
  */

	}, {
		key: "reset",
		value: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(username) {
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function reset(_x6) {
				return _ref5.apply(this, arguments);
			}

			return reset;
		}()

		/**
  async resetAll()
  	Reset all data about all users.
  */

	}, {
		key: "resetAll",
		value: function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function resetAll() {
				return _ref6.apply(this, arguments);
			}

			return resetAll;
		}()

		/**
  async freeze(string username)
  	Make a snapshot of the user's variables so that they can be restored
  later via `thaw()`. This is the implementation for
  `RiveScript.freezeUservars()`
  */

	}, {
		key: "freeze",
		value: function () {
			var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(username) {
				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function freeze(_x7) {
				return _ref7.apply(this, arguments);
			}

			return freeze;
		}()

		/**
  async thaw(string username, string action)
  	Restore the frozen snapshot of variables for a user.
  	This should replace _all_ of a user's variables with the frozen copy
  that was snapshotted with `freeze()`. If there are no frozen variables,
  this function should be a no-op (maybe print a warning?)
  	Valid options for `action` reflect the usage of `rs.thawUservars()`:
  	* `thaw`: Restore the variables and delete the frozen copy (default)
  * `discard`: Do not restore the variables, but delete the frozen copy
  * `keep`: Restore the variables and keep the frozen copy
  */

	}, {
		key: "thaw",
		value: function () {
			var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(username, action) {
				return regeneratorRuntime.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context8.stop();
						}
					}
				}, _callee8, this);
			}));

			function thaw(_x8, _x9) {
				return _ref8.apply(this, arguments);
			}

			return thaw;
		}()

		/**
  object defaultSession()
  	You do not need to override this method. This returns the default session
  variables for a new user, e.g. with the variable `topic="random"` as per
  the RiveScript spec.
  */

	}, {
		key: "defaultSession",
		value: function defaultSession() {
			return {
				"topic": "random"
			};
		}
	}]);

	return SessionManager;
}();

/**
MemorySessionManager

This is the default in-memory session store for RiveScript.

It keeps all user variables in an object in memory and does not persist them
to disk. This means it won't remember user variables between reboots of your
bot's program, but it remembers just fine during its lifetime.

The RiveScript methods `getUservars()` and `setUservars()` are available to
export and import user variables as JSON-serializable objects so that your
program could save them to disk on its own.

See the documentation for `SessionManager` for information on extending
RiveScript with an alternative session store.
*/


var MemorySessionManager = function (_SessionManager) {
	_inherits(MemorySessionManager, _SessionManager);

	function MemorySessionManager() {
		_classCallCheck(this, MemorySessionManager);

		var _this = _possibleConstructorReturn(this, (MemorySessionManager.__proto__ || Object.getPrototypeOf(MemorySessionManager)).call(this));

		var self = _this;
		self._users = {};
		self._frozen = {};
		return _this;
	}

	// init makes sure a user exists in the session store.


	_createClass(MemorySessionManager, [{
		key: "init",
		value: function init(username) {
			var self = this;
			if (self._users[username] === undefined) {
				self._users[username] = self.defaultSession();
			}
		}
	}, {
		key: "set",
		value: function () {
			var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(username, data) {
				var self;
				return regeneratorRuntime.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								self = this;
								return _context9.abrupt("return", new Promise(function (resolve, reject) {
									self.init(username);
									for (var key in data) {
										if (data.hasOwnProperty(key)) {
											self._users[username][key] = data[key];
										}
									}
									resolve();
								}));

							case 2:
							case "end":
								return _context9.stop();
						}
					}
				}, _callee9, this);
			}));

			function set(_x10, _x11) {
				return _ref9.apply(this, arguments);
			}

			return set;
		}()
	}, {
		key: "get",
		value: function () {
			var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(username, key) {
				var self;
				return regeneratorRuntime.wrap(function _callee10$(_context10) {
					while (1) {
						switch (_context10.prev = _context10.next) {
							case 0:
								self = this;
								return _context10.abrupt("return", new Promise(function (resolve, reject) {
									if (self._users[username] === undefined) {
										resolve(null);
									} else if (self._users[username][key] !== undefined) {
										resolve(self._users[username][key]);
									} else {
										resolve("undefined");
									}
								}));

							case 2:
							case "end":
								return _context10.stop();
						}
					}
				}, _callee10, this);
			}));

			function get(_x12, _x13) {
				return _ref10.apply(this, arguments);
			}

			return get;
		}()
	}, {
		key: "getAny",
		value: function () {
			var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(username) {
				var self;
				return regeneratorRuntime.wrap(function _callee11$(_context11) {
					while (1) {
						switch (_context11.prev = _context11.next) {
							case 0:
								self = this;
								return _context11.abrupt("return", new Promise(function (resolve, reject) {
									if (self._users[username] === undefined) {
										resolve(null);
									} else {
										resolve(utils.clone(self._users[username]));
									}
								}));

							case 2:
							case "end":
								return _context11.stop();
						}
					}
				}, _callee11, this);
			}));

			function getAny(_x14) {
				return _ref11.apply(this, arguments);
			}

			return getAny;
		}()
	}, {
		key: "getAll",
		value: function () {
			var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
				var self;
				return regeneratorRuntime.wrap(function _callee12$(_context12) {
					while (1) {
						switch (_context12.prev = _context12.next) {
							case 0:
								self = this;
								return _context12.abrupt("return", new Promise(function (resolve, reject) {
									resolve(utils.clone(self._users));
								}));

							case 2:
							case "end":
								return _context12.stop();
						}
					}
				}, _callee12, this);
			}));

			function getAll() {
				return _ref12.apply(this, arguments);
			}

			return getAll;
		}()
	}, {
		key: "reset",
		value: function () {
			var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(username) {
				var self;
				return regeneratorRuntime.wrap(function _callee13$(_context13) {
					while (1) {
						switch (_context13.prev = _context13.next) {
							case 0:
								self = this;
								return _context13.abrupt("return", new Promise(function (resolve, reject) {
									if (self._users[username] !== undefined) {
										delete self._users[username];
									}
									if (self._frozen[username] !== undefined) {
										delete self._frozen[username];
									}
									resolve();
								}));

							case 2:
							case "end":
								return _context13.stop();
						}
					}
				}, _callee13, this);
			}));

			function reset(_x15) {
				return _ref13.apply(this, arguments);
			}

			return reset;
		}()
	}, {
		key: "resetAll",
		value: function () {
			var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
				var self;
				return regeneratorRuntime.wrap(function _callee14$(_context14) {
					while (1) {
						switch (_context14.prev = _context14.next) {
							case 0:
								self = this;
								return _context14.abrupt("return", new Promise(function (resolve, reject) {
									self._users = {};
									self._frozen = {};
									resolve();
								}));

							case 2:
							case "end":
								return _context14.stop();
						}
					}
				}, _callee14, this);
			}));

			function resetAll() {
				return _ref14.apply(this, arguments);
			}

			return resetAll;
		}()
	}, {
		key: "freeze",
		value: function () {
			var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(username) {
				var self;
				return regeneratorRuntime.wrap(function _callee15$(_context15) {
					while (1) {
						switch (_context15.prev = _context15.next) {
							case 0:
								self = this;
								return _context15.abrupt("return", new Promise(function (resolve, reject) {
									if (self._users[username] !== undefined) {
										self._frozen[username] = utils.clone(self._users[username]);
										resolve();
									} else {
										reject("freeze(" + username + "): user not found");
									}
								}));

							case 2:
							case "end":
								return _context15.stop();
						}
					}
				}, _callee15, this);
			}));

			function freeze(_x16) {
				return _ref15.apply(this, arguments);
			}

			return freeze;
		}()
	}, {
		key: "thaw",
		value: function () {
			var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(username) {
				var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "thaw";
				var self;
				return regeneratorRuntime.wrap(function _callee16$(_context16) {
					while (1) {
						switch (_context16.prev = _context16.next) {
							case 0:
								self = this;
								return _context16.abrupt("return", new Promise(function (resolve, reject) {
									if (self._frozen[username] !== undefined) {
										// OK what are we doing?
										switch (action) {
											case "thaw":
												self._users[username] = utils.clone(self._frozen[username]);
												delete self._frozen[username];
												break;
											case "discard":
												delete self._frozen[username];
												break;
											case "keep":
												self._users[username] = utils.clone(self._frozen[username]);
												break;
											default:
												reject("bad thaw action");
										}
										resolve();
									} else {
										reject("thaw(" + username + "): no frozen variables found");
									}
								}));

							case 2:
							case "end":
								return _context16.stop();
						}
					}
				}, _callee16, this);
			}));

			function thaw(_x18) {
				return _ref16.apply(this, arguments);
			}

			return thaw;
		}()
	}]);

	return MemorySessionManager;
}(SessionManager);

/**
NullSessionManager

This is a session manager implementation that does not remember any user
variables. It is mostly useful for unit tests.
*/


var NullSessionManager = function (_SessionManager2) {
	_inherits(NullSessionManager, _SessionManager2);

	function NullSessionManager() {
		_classCallCheck(this, NullSessionManager);

		return _possibleConstructorReturn(this, (NullSessionManager.__proto__ || Object.getPrototypeOf(NullSessionManager)).apply(this, arguments));
	}

	_createClass(NullSessionManager, [{
		key: "set",
		value: function () {
			var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(username, data) {
				return regeneratorRuntime.wrap(function _callee17$(_context17) {
					while (1) {
						switch (_context17.prev = _context17.next) {
							case 0:
								return _context17.abrupt("return", noop());

							case 1:
							case "end":
								return _context17.stop();
						}
					}
				}, _callee17, this);
			}));

			function set(_x19, _x20) {
				return _ref17.apply(this, arguments);
			}

			return set;
		}()
	}, {
		key: "get",
		value: function () {
			var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(username, key) {
				return regeneratorRuntime.wrap(function _callee18$(_context18) {
					while (1) {
						switch (_context18.prev = _context18.next) {
							case 0:
								return _context18.abrupt("return", noop("undefined"));

							case 1:
							case "end":
								return _context18.stop();
						}
					}
				}, _callee18, this);
			}));

			function get(_x21, _x22) {
				return _ref18.apply(this, arguments);
			}

			return get;
		}()
	}, {
		key: "getAny",
		value: function () {
			var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(username) {
				return regeneratorRuntime.wrap(function _callee19$(_context19) {
					while (1) {
						switch (_context19.prev = _context19.next) {
							case 0:
								return _context19.abrupt("return", noop(null));

							case 1:
							case "end":
								return _context19.stop();
						}
					}
				}, _callee19, this);
			}));

			function getAny(_x23) {
				return _ref19.apply(this, arguments);
			}

			return getAny;
		}()
	}, {
		key: "getAll",
		value: function () {
			var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
				return regeneratorRuntime.wrap(function _callee20$(_context20) {
					while (1) {
						switch (_context20.prev = _context20.next) {
							case 0:
								return _context20.abrupt("return", noop(new Object()));

							case 1:
							case "end":
								return _context20.stop();
						}
					}
				}, _callee20, this);
			}));

			function getAll() {
				return _ref20.apply(this, arguments);
			}

			return getAll;
		}()
	}, {
		key: "reset",
		value: function () {
			var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(username) {
				return regeneratorRuntime.wrap(function _callee21$(_context21) {
					while (1) {
						switch (_context21.prev = _context21.next) {
							case 0:
								return _context21.abrupt("return", noop());

							case 1:
							case "end":
								return _context21.stop();
						}
					}
				}, _callee21, this);
			}));

			function reset(_x24) {
				return _ref21.apply(this, arguments);
			}

			return reset;
		}()
	}, {
		key: "resetAll",
		value: function () {
			var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
				return regeneratorRuntime.wrap(function _callee22$(_context22) {
					while (1) {
						switch (_context22.prev = _context22.next) {
							case 0:
								return _context22.abrupt("return", noop());

							case 1:
							case "end":
								return _context22.stop();
						}
					}
				}, _callee22, this);
			}));

			function resetAll() {
				return _ref22.apply(this, arguments);
			}

			return resetAll;
		}()
	}, {
		key: "freeze",
		value: function () {
			var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(username) {
				return regeneratorRuntime.wrap(function _callee23$(_context23) {
					while (1) {
						switch (_context23.prev = _context23.next) {
							case 0:
								return _context23.abrupt("return", noop());

							case 1:
							case "end":
								return _context23.stop();
						}
					}
				}, _callee23, this);
			}));

			function freeze(_x25) {
				return _ref23.apply(this, arguments);
			}

			return freeze;
		}()
	}, {
		key: "thaw",
		value: function () {
			var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(username, action) {
				return regeneratorRuntime.wrap(function _callee24$(_context24) {
					while (1) {
						switch (_context24.prev = _context24.next) {
							case 0:
								return _context24.abrupt("return", noop());

							case 1:
							case "end":
								return _context24.stop();
						}
					}
				}, _callee24, this);
			}));

			function thaw(_x26, _x27) {
				return _ref24.apply(this, arguments);
			}

			return thaw;
		}()
	}]);

	return NullSessionManager;
}(SessionManager);

module.exports.SessionManager = SessionManager;
module.exports.MemorySessionManager = MemorySessionManager;
module.exports.NullSessionManager = NullSessionManager;