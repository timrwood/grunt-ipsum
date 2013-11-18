var grunt = require('grunt');

function randomBetween(a, b) {
	a = a || 0;
	b = b || 1;
	return a + (Math.random() * (b - a));
}

module.exports = function (object, repeat, repetitions, availibility) {
	var out = grunt.util.kindOf(object) === 'array' ? [] : {};
	var normalizedRepetitions = {};
	var normalizedAvailibility = {};

	if (repetitions) {
		Object.keys(repetitions).forEach(function (key) {
			normalizedRepetitions['top.' + key] = repetitions[key];
		});
	}
	normalizedRepetitions.top = repeat;

	if (availibility) {
		Object.keys(availibility).forEach(function (key) {
			normalizedAvailibility['top.' + key] = availibility[key];
		});
	}

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
					if (kind === 'array') {
						itemOutput[i] = [];
						recurse(item, itemOutput[i], itemPath + '.');
					} else if (kind === 'object') {
						itemOutput[i] = {};
						recurse(item, itemOutput[i], itemPath + '.');
					} else {
						itemOutput[i] = item;
					}
				}
				output[key] = itemOutput;
			} else if (kind === 'array') {
				output[key] = [];
				recurse(item, output[key], itemPath + '.');
			} else if (kind === 'object') {
				output[key] = {};
				recurse(item, output[key], itemPath + '.');
			} else {
				output[key] = item;
			}
		});
	}

	recurse({ top : object }, out, '');

	return out.top;
};
