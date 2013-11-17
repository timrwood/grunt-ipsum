var repeater = require('../../lib/repeater'),
	grunt = require('grunt');

exports.repeater = {
	setUp: function (done) {
		done();
	},
	fixed_repetitions : function (test) {
		var object = {
			a : 'a',
			b : 'b',
			c : {
				d : 'd'
			},
			e : {
				f : {
					g : 'g'
				}
			}
		};

		var repetitions = {
			'b' : 2,
			'c.d' : 3,
			'e.f.g' : 4
		};

		var actual = repeater(object, null, repetitions);

		test.equal(actual.a, 'a', 'Should not convert properties without a repetition to an array.');

		test.equal(actual.b.length, 2, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.b, ['b', 'b'], 'Should wrap repeated properties in an array.');

		test.equal(actual.c.d.length, 3, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.c.d, ['d', 'd', 'd'], 'Should wrap repeated properties in an array.');

		test.equal(actual.e.f.g.length, 4, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.e.f.g, ['g', 'g', 'g', 'g'], 'Should wrap repeated properties in an array.');

		test.done();
	},
	fixed_repetitions_of_objects : function (test) {
		var object = {
			a : 'a',
			b : 'b',
			c : {
				d : 'd'
			},
			e : [
				1
			]
		};

		var repetitions = {
			'b' : 2,
			'c' : 3,
			'e' : 4
		};

		var actual = repeater(object, null, repetitions);

		test.equal(actual.a, 'a', 'Should not convert properties without a repetition to an array.');

		test.equal(actual.b.length, 2, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.b, ['b', 'b'], 'Should wrap repeated properties in an array.');

		test.equal(actual.c.length, 3, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.c, [{d : 'd'}, {d : 'd'}, {d : 'd'}], 'Should wrap repeated properties in an array.');

		test.equal(actual.e.length, 4, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.e, [[1], [1], [1], [1]], 'Should wrap repeated properties in an array.');

		test.done();
	},
	fixed_repetitions_of_repetitions : function (test) {
		var object = {
			a : {
				b : 'b'
			}
		};

		var repetitions = {
			'a' : 2,
			'a.b' : 3
		};

		var actual = repeater(object, null, repetitions);

		test.equal(actual.a.length, 2, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.a, [{b : ['b', 'b', 'b']}, {b : ['b', 'b', 'b']}], 'Should wrap repeated properties in an array.');

		test.equal(actual.a[0].b.length, 3, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.a[0].b, ['b', 'b', 'b'], 'Should wrap repeated properties in an array.');

		test.equal(actual.a[1].b.length, 3, 'Should wrap repeated properties in an array.');
		test.deepEqual(actual.a[1].b, ['b', 'b', 'b'], 'Should wrap repeated properties in an array.');

		test.done();
	},
	top_level_repetition : function (test) {
		var object = {
			a : 'a'
		};
		var actual = repeater(object, 4);

		test.equal(actual.length, 4, 'Should wrap top level in an array.');
		test.deepEqual(actual, [{a : 'a'}, {a : 'a'}, {a : 'a'}, {a : 'a'}], 'Should wrap top level in an array.');

		test.done();
	},
	create_file : function (test) {
		test.ok(grunt.file.exists('test/actual/repeater.json'), 'Should create files.');

		test.done();
	},
	from_grunt_task : function (test) {
		var actual = grunt.file.readJSON('test/actual/repeater.json');

		test.equal(actual.length, 4, 'Should wrap top level in an array.');

		test.equal(actual[0].name.length, 3, 'Should wrap repeated properties in an array.');
		test.equal(actual[0].city.length, 2, 'Should wrap repeated properties in an array.');

		test.equal(actual[1].name.length, 3, 'Should wrap repeated properties in an array.');
		test.equal(actual[1].city.length, 2, 'Should wrap repeated properties in an array.');

		test.equal(actual[2].name.length, 3, 'Should wrap repeated properties in an array.');
		test.equal(actual[2].city.length, 2, 'Should wrap repeated properties in an array.');

		test.equal(actual[3].name.length, 3, 'Should wrap repeated properties in an array.');
		test.equal(actual[3].city.length, 2, 'Should wrap repeated properties in an array.');

		test.done();
	},
	randomized_repetitions : function (test) {
		var object = {
			a : 'a'
		};

		var repetitions = {
			'a' : [2, 6]
		};

		var actual = repeater(object, [20, 30], repetitions);

		test.ok(actual.length > 19, 'Should be at least the minimum number of repetitions.');
		test.ok(actual.length < 31, 'Should be at less than the maximim number of repetitions.');

		for (var i = 0; i < actual.length; i++) {
			test.ok(actual[i].a.length > 1, 'Should be at least the minimum number of repetitions. (' + actual[i].a.length + ' > 1)');
			test.ok(actual[i].a.length < 7, 'Should be at less than the maximim number of repetitions. (' + actual[i].a.length + ' < 7)');
		}

		test.done();
	},
	randomized_sub_repetitions : function (test) {
		var object = {
			a : 'a'
		};

		var repetitions = {
			'a' : [1, 6]
		};

		var randomCount = 0;
		var randomMax = 5;
		var oldRandom = Math.random;
		Math.random = function () {
			var output = randomCount / randomMax;
			randomCount++;
			return output;
		};

		var actual = repeater(object, 5, repetitions);

		for (var i = 0; i < 5; i++) {
			test.equal(actual[i].a.length, i + 1, 'Each child should be able to have different lengths.');
		}

		Math.random = oldRandom;

		test.done();
	},
	from_grunt_task_randomized : function (test) {
		var actual = grunt.file.readJSON('test/actual/repeater_random.json');

		test.ok(actual.length > 4, 'Should be at least the minimum number of repetitions.');
		test.ok(actual.length < 11, 'Should be at less than the maximim number of repetitions.');

		var length;
		for (var i = 0; i < actual.length; i++) {
			length = actual[i].name.length;
			test.ok(length > 0, 'Should be at least the minimum number of repetitions. (' + length + ' > 0)');
			test.ok(length < 6, 'Should be at less than the maximim number of repetitions. (' + length + ' < 6)');

			length = actual[i].city.length;
			test.ok(length > 0, 'Should be at least the minimum number of repetitions. (' + length + ' > 0)');
			test.ok(length < 6, 'Should be at less than the maximim number of repetitions. (' + length + ' < 6)');
		}

		test.done();
	},
};
