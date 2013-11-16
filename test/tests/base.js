var grunt = require('grunt');

exports.base = {
	setUp: function (done) {
		done();
	},
	create_file : function (test) {
		test.ok(grunt.file.exists('test/actual/base.json'), 'Should create files.');

		test.done();
	},
	literal_properties : function (test) {
		var actual = grunt.file.readJSON('test/actual/base.json');

		test.equal(actual.a, 'alpha', 'Should export string literals.');
		test.equal(actual.b, 'beta', 'Should export string literals.');
		test.equal(actual.one, 1, 'Should export number literals.');
		test.equal(actual.two, 2, 'Should export number literals.');

		test.done();
	},
	nested_literal_properties : function (test) {
		var actual = grunt.file.readJSON('test/actual/base.json');

		test.equal(actual.nest.c, 'cat', 'Should export nested string literals.');
		test.equal(actual.nest.d, 'dog', 'Should export nested string literals.');
		test.equal(actual.nest.deep.prop, true, 'Should export deeply nested string literals.');
		test.equal(actual.array[0], 'four', 'Should export array nested string literals.');
		test.equal(actual.array[1], 5, 'Should export array nested number literals.');

		test.done();
	},
};
