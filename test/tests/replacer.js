var replacer = require('../../lib/replacer'),
	getter = require('../../lib/getter'),
	grunt = require('grunt');

exports.replacer = {
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
	replace_type : function (test) {
		var array = replacer([], {});
		var object = replacer({}, {});

		test.equal(grunt.util.kindOf(array), 'array', 'Should return an array if an array was passed in.');
		test.equal(grunt.util.kindOf(object), 'object', 'Should return an object if an object was passed in.');

		test.done();
	},
	replace_self : function (test) {
		var object = {
			a : '{%= b %}',
			c : '{%= self.a %}',
			d : 'delta {%= self.c %}'
		};

		var data = {
			b : 'beta'
		};

		var actual = replacer(object, data);

		test.equal(actual.a, 'beta', 'Should replace properties from dynamic getters.');
		test.equal(actual.c, 'beta', 'Should replace self properties from previous results.');
		test.equal(actual.d, 'delta beta', 'Should replace self properties from previous self properties.');

		test.done();
	},
	existing_helpers : function (test) {
		var object = {
			name : 'Some Name',
			slug : '{%= _.slugify(self.name) %}',
			grunt : '{%= grunt.template.date(847602000000, "yyyy-mm") %}'
		};

		var actual = replacer(object, {});

		test.equal(actual.name, 'Some Name', 'Should not replace string literals.');
		test.equal(actual.slug, 'some-name', 'Underscore.string helpers should be available in the template context.');
		test.equal(actual.grunt, '1996-11', 'Grunt helpers should be available in the template context.');

		test.done();
	},
};
