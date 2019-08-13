// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.

"use strict";

/**
Data sorting functions
*/

var utils = require("./utils");

/**
string[] sortTriggerSet (string[] triggers[, exclude_previous[, func say]])

Sort a group of triggers in an optimal sorting order. The `say` parameter is
a reference to RiveScript.say() or provide your own function (or not) for
debug logging from within this function.

This function has two use cases:

1. create a sort buffer for "normal" (matchable) triggers, which are triggers
   which are NOT accompanied by a %Previous tag.
2. create a sort buffer for triggers that had %Previous tags.

Use the `exclude_previous` parameter to control which one is being done.
This function will return a list of items in the format of
`[ "trigger text", trigger pointer ]` and it's intended to have no duplicate
trigger patterns (unless the source RiveScript code explicitly uses the
same duplicate pattern twice, which is a user error).
*/
exports.sortTriggerSet = function (triggers, exclude_previous, say) {
	var self = this;
	var match;

	if (say == null) {
		say = function say(what) {};
	}
	if (exclude_previous == null) {
		exclude_previous = true;
	}

	// KEEP IN MIND: the `triggers` array is composed of array elements of the form
	// ["trigger text", pointer to trigger data]
	// So this code will use e.g. `trig[0]` when referring to the trigger text.

	// Create a priority map.
	var prior = {
		"0": []
	};

	// Sort triggers by their weights.
	for (var i = 0, len = triggers.length; i < len; i++) {
		var trig = triggers[i];

		// If we're excluding triggers with "previous" values, skip them here.
		if (exclude_previous && trig[1].previous != null) {
			continue;
		}

		match = trig[0].match(/\{weight=(\d+)\}/i);
		var weight = 0;
		if (match && match[1]) {
			weight = match[1];
		}
		if (prior[weight] == null) {
			prior[weight] = [];
		}
		prior[weight].push(trig);
	}

	// Keep a running list of sorted triggers for this topic.
	var running = [];
	var prior_sort = Object.keys(prior).sort(function (a, b) {
		return b - a;
	});
	for (var j = 0, len1 = prior_sort.length; j < len1; j++) {
		var p = prior_sort[j];
		say("Sorting triggers with priority " + p);

		// So, some of these triggers may include an {inherits} tag, if they came
		// from a topic which inherits another topic. Lower inherits values mean
		// higher priority on the stack.
		var inherits = -1; // -1 means no {inherits} tag
		var highest_inherits = -1; // highest number seen so far

		// Loop through and categorize these triggers.
		var track = {};
		track[inherits] = initSortTrack();
		for (var k = 0, len2 = prior[p].length; k < len2; k++) {
			var _trig = prior[p][k];
			var pattern = _trig[0];
			say("Looking at trigger: " + pattern);

			// See if it has an inherits tag.
			match = pattern.match(/\{inherits=(\d+)\}/i);
			if (match) {
				inherits = parseInt(match[1]);
				if (inherits > highest_inherits) {
					highest_inherits = inherits;
				}
				say("Trigger belongs to a topic that inherits other topics. Level=" + inherits);
				pattern = pattern.replace(/\{inherits=\d+\}/ig, "");
				_trig[0] = pattern;
			} else {
				inherits = -1;
			}

			// If this is the first time we've seen this inheritance level,
			// initialize its sort track structure.
			if (track[inherits] == null) {
				track[inherits] = initSortTrack();
			}

			// Start inspecting the trigger's contents.
			if (pattern.indexOf("_") > -1) {
				// Alphabetic wildcard included.
				var cnt = utils.word_count(pattern);
				say("Has a _ wildcard with " + cnt + " words.");
				if (cnt > 0) {
					if (track[inherits].alpha[cnt] == null) {
						track[inherits].alpha[cnt] = [];
					}
					track[inherits].alpha[cnt].push(_trig);
				} else {
					track[inherits].under.push(_trig);
				}
			} else if (pattern.indexOf("#") > -1) {
				// Numeric wildcard included.
				var _cnt = utils.word_count(pattern);
				say("Has a # wildcard with " + _cnt + " words.");
				if (_cnt > 0) {
					if (track[inherits].number[_cnt] == null) {
						track[inherits].number[_cnt] = [];
					}
					track[inherits].number[_cnt].push(_trig);
				} else {
					track[inherits].pound.push(_trig);
				}
			} else if (pattern.indexOf("*") > -1) {
				// Wildcard included.
				var _cnt2 = utils.word_count(pattern);
				say("Has a * wildcard with " + _cnt2 + " words.");
				if (_cnt2 > 0) {
					if (track[inherits].wild[_cnt2] == null) {
						track[inherits].wild[_cnt2] = [];
					}
					track[inherits].wild[_cnt2].push(_trig);
				} else {
					track[inherits].star.push(_trig);
				}
			} else if (pattern.indexOf("[") > -1) {
				// Optionals included.
				var _cnt3 = utils.word_count(pattern);
				say("Has optionals with " + _cnt3 + " words.");
				if (track[inherits].option[_cnt3] == null) {
					track[inherits].option[_cnt3] = [];
				}
				track[inherits].option[_cnt3].push(_trig);
			} else {
				// Totally atomic
				var _cnt4 = utils.word_count(pattern);
				say("Totally atomic trigger with " + _cnt4 + " words.");
				if (track[inherits].atomic[_cnt4] == null) {
					track[inherits].atomic[_cnt4] = [];
				}
				track[inherits].atomic[_cnt4].push(_trig);
			}
		}

		// Move the no-{inherits} triggers to the bottom of the stack.
		track[highest_inherits + 1] = track['-1'];
		delete track['-1'];

		// Add this group to the sort track.
		var track_sorted = Object.keys(track).sort(function (a, b) {
			return a - b;
		});
		for (var l = 0, len3 = track_sorted.length; l < len3; l++) {
			var ip = track_sorted[l];
			say("ip=" + ip);

			var groups = ["atomic", "option", "alpha", "number", "wild"];
			// Sort each of the main kinds of triggers by their word counts.
			for (var m = 0, len4 = groups.length; m < len4; m++) {
				var kind = groups[m];
				var kind_sorted = Object.keys(track[ip][kind]).sort(function (a, b) {
					return b - a;
				});

				for (var n = 0, len5 = kind_sorted.length; n < len5; n++) {
					var wordcnt = kind_sorted[n];

					// Triggers with equal word lengths should be sorted by overall
					// trigger length.
					var sorted_by_length = track[ip][kind][wordcnt].sort(function (a, b) {
						return b.length - a.length;
					});
					running.push.apply(running, sorted_by_length);
				}
			}

			// Add the single wildcard triggers.
			var under_sorted = track[ip].under.sort(function (a, b) {
				return b.length - a.length;
			});
			var pound_sorted = track[ip].pound.sort(function (a, b) {
				return b.length - a.length;
			});
			var star_sorted = track[ip].star.sort(function (a, b) {
				return b.length - a.length;
			});
			running.push.apply(running, under_sorted);
			running.push.apply(running, pound_sorted);
			running.push.apply(running, star_sorted);
		}
	}

	return running;
};

/**
string[] sortList (string[] items)

Sort a list of strings by their word counts and lengths.
*/
exports.sortList = function (items) {
	var self = this;

	// Track by number of words.
	var track = {};

	// Loop through each item.
	for (var i = 0, len = items.length; i < len; i++) {
		var item = items[i];
		var cnt = utils.word_count(item, true);
		if (track[cnt] == null) {
			track[cnt] = [];
		}
		track[cnt].push(item);
	}

	// Sort them.
	var output = [];
	var sorted = Object.keys(track).sort(function (a, b) {
		return b - a;
	});
	for (var j = 0, len1 = sorted.length; j < len1; j++) {
		var count = sorted[j];
		var bylen = track[count].sort(function (a, b) {
			return b.length - a.length;
		});
		output.push.apply(output, bylen);
	}

	return output;
};

/**
private object initSortTrack ()

Returns a new object for keeping track of triggers for sorting.
*/
var initSortTrack = function initSortTrack() {
	return {
		atomic: {},
		option: {},
		alpha: {},
		number: {},
		wild: {},
		pound: [],
		under: [],
		star: []
	};
};