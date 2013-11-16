var grunt = require('grunt');

grunt.template.addDelimiters('ipsum-delimiters', '{%', '%}');

module.exports = function (object, data) {
	var out = {};

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

	recurse({
		obj : object
	}, out);

	return out.obj;
};
