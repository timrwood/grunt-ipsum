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

		var keys = [
			'name',
			'firstName',
			'lastName',
			'zipCode',
			'zipCodeFormat',
			'city',
			'streetName',
			'streetAddress',
			'secondaryAddress',
			'brState',
			'ukCounty',
			'ukCountry',
			'usState',
			'latitude',
			'longitude',
			'phoneNumber',
			'phoneNumberFormat',
			'email',
			'userName',
			'domainName',
			'domainWord',
			'ip',
			'companyName',
			'companySuffix',
			'catchPhrase',
			'bs',
			'niceNice',
			'niceNiceMustang',
			'fillMurray',
			'fillMurrayBw',
			'placeCage',
			'placeCageBw',
			'placeCageCrazy',
			'placeBear',
			'placeBearBw',
			'placeDog',
			'placeDogBw',
			'placeKitten',
			'placeKittenBw',
			'placeZombie',
			'placeZombieBw',
			'placeSheen',
			'baconMockup',
			'loremPixel',
			'loremPixelAbstract',
			'loremPixelAnimals',
			'loremPixelBusiness',
			'loremPixelCats',
			'loremPixelCity',
			'loremPixelFood',
			'loremPixelNightlife',
			'loremPixelFashion',
			'loremPixelPeople',
			'loremPixelNature',
			'loremPixelSports',
			'loremPixelTechnics',
			'loremPixelTransport',
			'loremPixelBw',
			'loremPixelAbstractBw',
			'loremPixelAnimalsBw',
			'loremPixelBusinessBw',
			'loremPixelCatsBw',
			'loremPixelCityBw',
			'loremPixelFoodBw',
			'loremPixelNightlifeBw',
			'loremPixelFashionBw',
			'loremPixelPeopleBw',
			'loremPixelNatureBw',
			'loremPixelSportsBw',
			'loremPixelTechnicsBw',
			'loremPixelTransportBw',
		];

		test.expect(keys.length);

		keys.forEach(function (key) {
			test.ok(actual[key], 'Should export a value for ' + key);
		});

		test.done();
	},
};
