var grunt = require('grunt');

module.exports = function (object, repeat, repetitions) {
	var out = grunt.util.kindOf(object) === 'array' ? [] : {};
	var normalizedRepetitions = {};

	if (repetitions) {
		Object.keys(repetitions).forEach(function (key) {
			normalizedRepetitions['top.' + key] = repetitions[key];
		});
	}
	normalizedRepetitions.top = repeat;

	function recurse(input, output, path) {
		Object.keys(input).forEach(function (key) {
			var item = input[key],
				itemPath = path + key,
				itemRepeat = normalizedRepetitions[itemPath],
				itemOutput = item,
				kind = grunt.util.kindOf(item),
				i;

			if (itemRepeat) {
				itemOutput = [];
				for (i = 0; i < itemRepeat; i++) {
					itemOutput[i] = item;
				}
				if (kind === 'array' || kind === 'object') {
					recurse(item, itemOutput[0], itemPath + '.');
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
