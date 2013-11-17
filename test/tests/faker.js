var grunt = require('grunt');

exports.faker = {
	setUp: function (done) {
		done();
	},
	create_file : function (test) {
		test.ok(grunt.file.exists('test/actual/faker.json'), 'Should create files.');

		test.done();
	},
	literal_properties : function (test) {
		var actual = grunt.file.readJSON('test/actual/faker.json');

		test.ok(actual.name, 'Should export a value from Faker.js');
		test.ok(actual.firstName, 'Should export a value from Faker.js');
		test.ok(actual.lastName, 'Should export a value from Faker.js');
		test.ok(actual.zipCode, 'Should export a value from Faker.js');
		test.ok(actual.zipCodeFormat, 'Should export a value from Faker.js');
		test.ok(actual.city, 'Should export a value from Faker.js');
		test.ok(actual.streetName, 'Should export a value from Faker.js');
		test.ok(actual.streetAddress, 'Should export a value from Faker.js');
		test.ok(actual.secondaryAddress, 'Should export a value from Faker.js');
		test.ok(actual.brState, 'Should export a value from Faker.js');
		test.ok(actual.ukCounty, 'Should export a value from Faker.js');
		test.ok(actual.ukCountry, 'Should export a value from Faker.js');
		test.ok(actual.usState, 'Should export a value from Faker.js');
		test.ok(actual.latitude, 'Should export a value from Faker.js');
		test.ok(actual.longitude, 'Should export a value from Faker.js');

		test.done();
	},
};
