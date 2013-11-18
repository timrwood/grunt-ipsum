var grunt = require('grunt');

function randomBetween(a, b) {
	a = a || 0;
	b = b || 1;
	return a + (Math.random() * (b - a));
}

function emptyForKind(kind) {
	return kind === 'array' ? [] : {};
}

function prependTopPath(object) {
	var output = {};
	if (object) {
		Object.keys(object).forEach(function (key) {
			output['top.' + key] = object[key];
		});
	}
	return output;
}

function expandRecurseRepeat(item, timesToRepeat, itemPath, cb) {
	var output = [],
		kind = grunt.util.kindOf(item);

	for (var i = 0; i < timesToRepeat; i++) {
		output[i] = item;
		if (kind === 'array' || kind === 'object') {
			output[i] = emptyForKind(kind);
			cb(item, output[i], itemPath + '.');
		} else {
			output[i] = item;
		}
	}

	return output;
}


function recurse(input, output, path, repetitions, availibility) {
	Object.keys(input).forEach(function (key) {
		var item = input[key],
			itemPath = path + key,
			timesToRepeat = repetitions[itemPath],
			itemAvailibility = availibility[itemPath],
			kind = grunt.util.kindOf(item);

		// if the availibility for this path is greater than a random
		// number between 0 and 1, use a null value instead.
		if (itemAvailibility !== undefined && itemAvailibility <= Math.random()) {
			output[key] = null;
			return;
		}

		// convert [x, y] to a random number between x and y
		if (grunt.util.kindOf(timesToRepeat) === 'array') {
			timesToRepeat = randomBetween(timesToRepeat[0], timesToRepeat[1]);
		}

		// if this property needs to be repeated, create an array and recurse
		// this object as each item in the array
		if (timesToRepeat) {
			output[key] = expandRecurseRepeat(item, timesToRepeat, itemPath, function (input, output, path) {
				recurse(input, output, path, repetitions, availibility);
			});
		} else if (kind === 'array' || kind === 'object') {
			output[key] = emptyForKind(kind);
			recurse(item, output[key], itemPath + '.', repetitions, availibility);
		} else {
			output[key] = item;
		}
	});
}

module.exports = function (object, repeat, repetitions, availibility) {
	var out = emptyForKind(grunt.util.kindOf(object));
	var normalizedAvailibility = prependTopPath(availibility);
	var normalizedRepetitions = prependTopPath(repetitions);
	normalizedRepetitions.top = repeat;


	recurse({ top : object }, out, '', normalizedRepetitions, normalizedAvailibility);

	return out.top;
};
