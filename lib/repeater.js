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

module.exports = function (object, repeat, repetitions, availibility) {
	var out = emptyForKind(grunt.util.kindOf(object));
	var normalizedAvailibility = prependTopPath(availibility);
	var normalizedRepetitions = prependTopPath(repetitions);
	normalizedRepetitions.top = repeat;

	function recurse(input, output, path) {
		Object.keys(input).forEach(function (key) {
			var item = input[key],
				itemPath = path + key,
				itemRepeat = normalizedRepetitions[itemPath],
				itemOutput = item,
				itemAvailibility = normalizedAvailibility[itemPath],
				kind = grunt.util.kindOf(item),
				i;

			if (itemAvailibility !== undefined && itemAvailibility <= Math.random()) {
				output[key] = null;
				return;
			}

			if (grunt.util.kindOf(itemRepeat) === 'array') {
				itemRepeat = randomBetween(itemRepeat[0], itemRepeat[1]);
			}

			if (itemRepeat) {
				itemOutput = [];
				for (i = 0; i < itemRepeat; i++) {
					itemOutput[i] = item;
					if (kind === 'array' || kind === 'object') {
						itemOutput[i] = emptyForKind(kind);
						recurse(item, itemOutput[i], itemPath + '.');
					} else {
						itemOutput[i] = item;
					}
				}
				output[key] = itemOutput;
			} else if (kind === 'array' || kind === 'object') {
				output[key] = emptyForKind(kind);
				recurse(item, output[key], itemPath + '.');
			} else {
				output[key] = item;
			}
		});
	}

	recurse({ top : object }, out, '');

	return out.top;
};
