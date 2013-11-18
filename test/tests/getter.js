var getter = require('../../lib/getter');

exports.getter = {
	setUp: function (done) {
		done();
	},
	make_getter : function (test) {
		var object = {};

		getter(object, 'a', function () {
			return 'alpha';
		});

		test.equal(object.a, 'alpha', 'Should return a string when accessing as a property.');
		test.equal(object.a(), 'alpha', 'Should return a string when accessing as a method.');

		test.done();
	},
	make_getter_arguments : function (test) {
		var object = {};

		getter(object, 'a', function (a, b) {
			return 'alpha' + a + b;
		});

		test.equal(object.a, 'alphaundefinedundefined', 'Should allow arguments to change result.');
		test.equal(object.a(1), 'alpha1undefined', 'Should allow arguments to change result.');
		test.equal(object.a(1, 'a'), 'alpha1a', 'Should allow arguments to change result.');
		test.equal(object.a(' beta', ' gamma'), 'alpha beta gamma', 'Should allow arguments to change result.');

		test.done();
	},
	make_getter_dynamic : function (test) {
		var object = {};
		var value = 'alpha';

		getter(object, 'a', function () {
			return value;
		});

		test.equal(object.a, 'alpha', 'Should allow dynamic results.');
		test.equal(object.a(), 'alpha', 'Should allow dynamic results.');

		value = 'beta';

		test.equal(object.a, 'beta', 'Should allow dynamic results.');
		test.equal(object.a(), 'beta', 'Should allow dynamic results.');

		test.done();
	},
	make_getter_with_defaults : function (test) {
		var object = {};

		getter(object, 'a', function (a, b) {
			return a + b;
		}, ['c', 'd']);

		test.equal(object.a, 'cd', 'Should use default arguments.');
		test.equal(object.a('a'), 'ad', 'Should be able to override a default.');
		test.equal(object.a('a', 'b'), 'ab', 'Should be able to override all defaults.');

		test.done();
	},
};
