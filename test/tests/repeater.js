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
};
