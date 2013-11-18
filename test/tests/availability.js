var repeater = require('../../lib/repeater'),
	grunt = require('grunt');

exports.replacer = {
	setUp: function (done) {
		done();
	},
	replace : function (test) {
		var object = {
			a : 'b',
			c : 'd',
		};

		var availibility = {
			a : 1,
			c : 0
		};

		var actual = repeater(object, null, null, availibility);

		test.equal(actual.a, 'b', 'Should have a property at 100% availibility.');
		test.equal(actual.c, null, 'Should not have a property at 0% availibility.');

		test.done();
	},
	replace_random : function (test) {
		var oldRandom = Math.random;

		var object = {
			a : 'a',
			b : 'b',
			c : 'c',
			d : 'd',
			e : 'e'
		};

		var availibility = {
			a : 0,
			b : 0.25,
			c : 0.5,
			d : 0.75,
			e : 1
		};

		var actual;

		Math.random = function () {
			return 0.25;
		};

		actual = repeater(object, null, null, availibility);

		test.equal(actual.a, null, 'Should not have a 0.0 property when Math.random() == 0.25.');
		test.equal(actual.b, null, 'Should not have a 0.25 property when Math.random() == 0.25.');
		test.equal(actual.c, 'c', 'Should have a 0.5 property when Math.random() == 0.25.');
		test.equal(actual.d, 'd', 'Should have a 0.75 property when Math.random() == 0.25.');
		test.equal(actual.e, 'e', 'Should have a 1 property when Math.random() == 0.25.');

		Math.random = function () {
			return 0.5;
		};

		actual = repeater(object, null, null, availibility);

		test.equal(actual.a, null, 'Should not have a 0.0 property when Math.random() == 0.5.');
		test.equal(actual.b, null, 'Should not have a 0.25 property when Math.random() == 0.5.');
		test.equal(actual.c, null, 'Should not have a 0.5 property when Math.random() == 0.5.');
		test.equal(actual.d, 'd', 'Should have a 0.75 property when Math.random() == 0.5.');
		test.equal(actual.e, 'e', 'Should have a 1 property when Math.random() == 0.5.');

		Math.random = function () {
			return 0.75;
		};

		actual = repeater(object, null, null, availibility);

		test.equal(actual.a, null, 'Should not have a 0.0 property when Math.random() == 0.75.');
		test.equal(actual.b, null, 'Should not have a 0.25 property when Math.random() == 0.75.');
		test.equal(actual.c, null, 'Should not have a 0.5 property when Math.random() == 0.75.');
		test.equal(actual.d, null, 'Should not have a 0.75 property when Math.random() == 0.75.');
		test.equal(actual.e, 'e', 'Should have a 1 property when Math.random() == 0.75.');

		Math.random = oldRandom;

		test.done();
	},
	create_file : function (test) {
		test.ok(grunt.file.exists('test/actual/availibility.json'), 'Should create files.');

		test.done();
	},
	availibility_within_grunt_task : function (test) {
		var actual = grunt.file.readJSON('test/actual/availibility.json');

		test.equal(actual.a, 'alpha', 'Should have a property at 100% availibility.');
		test.equal(actual.b, null, 'Should not have a property at 0% availibility.');

		test.done();
	},
};
