var replacer = require('../../lib/replacer'),
	getter = require('../../lib/getter');

exports.base = {
	setUp: function (done) {
		done();
	},
	replace : function (test) {
		var object = {
			a : '{%= b %}',
			c : '{%= d %}',
			e : {
				f : '{%= g %}'
			},
			h : [
				'{%= b %}',
				'{%= d %}',
				'{%= g %}',
				{
					deep : '{%= b %}'
				}
			]
		};

		var data = {
			b : 'beta',
			d : 'dog',
			g : 'goat'
		};

		var actual = replacer(object, data);

		test.equal(actual.a, 'beta', 'Should replace properties.');
		test.equal(actual.c, 'dog', 'Should replace properties.');
		test.equal(actual.e.f, 'goat', 'Should replace nested properties.');
		test.deepEqual(actual.h, ['beta', 'dog', 'goat', { deep : 'beta' }], 'Should replace array items.');

		test.done();
	},
	replace_with_getter : function (test) {
		var object = {
			a : '{%= b %}',
			c : '{%= b() %}'
		};

		var data = {};

		getter(data, 'b', function () {
			return 'alpha';
		});

		var actual = replacer(object, data);

		test.equal(actual.a, 'alpha', 'Should replace properties from dynamic getters.');
		test.equal(actual.c, 'alpha', 'Should replace properties from dynamic getters as functions.');
		test.equal(JSON.stringify(actual), '{"a":"alpha","c":"alpha"}', 'Should replace properties from dynamic getters.');

		test.done();
	},
};
