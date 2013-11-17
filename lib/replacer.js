var grunt = require('grunt');

grunt.template.addDelimiters('ipsum-delimiters', '{%', '%}');

module.exports = function (object, data) {
	var out = grunt.util.kindOf(object) === 'array' ? [] : {};

	data.self = out;

	function recurse(input, output) {
		Object.keys(input).forEach(function (key) {
			var kind = grunt.util.kindOf(input[key]);
			if (kind === 'array') {
				output[key] = [];
				recurse(input[key], output[key]);
			} else if (kind === 'object') {
				output[key] = {};
				recurse(input[key], output[key]);
			} else if (kind === 'string') {
				output[key] = grunt.template.process(input[key], {
					data : data,
					delimiters : 'ipsum-delimiters'
				});
			} else {
				output[key] = input[key];
			}
		});
	}

	recurse(object, out);

	return out;
};
