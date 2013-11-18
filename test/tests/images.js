var grunt = require('grunt');

exports.faker = {
	setUp: function (done) {
		done();
	},
	create_file_defaults : function (test) {
		test.ok(grunt.file.exists('test/actual/images.json'), 'Should create files.');

		test.done();
	},
	images_matching_regex_defaults : function (test) {
		var actual = grunt.file.readJSON('test/actual/images.json');

		var wh = '/[1-5][0-9][0-9]/[1-5][0-9][0-9]';

		var matches = {
			fillMurray              : '^http://fillmurray.com' + wh + '$',
			fillMurrayBw            : '^http://fillmurray.com/g' + wh + '$',
			placeCage               : '^http://placecage.com' + wh + '$',
			placeCageBw             : '^http://placecage.com/g' + wh + '$',
			placeCageCrazy          : '^http://placecage.com/c' + wh + '$',
			placeBear               : '^http://placebear.com' + wh + '$',
			placeBearBw             : '^http://placebear.com/g' + wh + '$',
			placeDog                : '^http://placedog.com' + wh + '$',
			placeDogBw              : '^http://placedog.com/g' + wh + '$',
			placeKitten             : '^http://placekitten.com' + wh + '$',
			placeKittenBw           : '^http://placekitten.com/g' + wh + '$',
			placeZombie             : '^http://placezombies.com/[1-5][0-9][0-9]x[1-5][0-9][0-9]$',
			placeZombieBw           : '^http://placezombies.com/g/[1-5][0-9][0-9]x[1-5][0-9][0-9]$',
			placeSheen              : '^http://placesheen.com' + wh + '$',
			baconMockup             : '^http://baconmockup.com' + wh + '$',
			loremPixel              : '^http://lorempixel.com' + wh + '$',
			loremPixelAbstract      : '^http://lorempixel.com' + wh + '/abstract$',
			loremPixelAnimals       : '^http://lorempixel.com' + wh + '/animals$',
			loremPixelBusiness      : '^http://lorempixel.com' + wh + '/business$',
			loremPixelCats          : '^http://lorempixel.com' + wh + '/cats$',
			loremPixelCity          : '^http://lorempixel.com' + wh + '/city$',
			loremPixelFood          : '^http://lorempixel.com' + wh + '/food$',
			loremPixelNightlife     : '^http://lorempixel.com' + wh + '/nightlife$',
			loremPixelFashion       : '^http://lorempixel.com' + wh + '/fashion$',
			loremPixelPeople        : '^http://lorempixel.com' + wh + '/people$',
			loremPixelNature        : '^http://lorempixel.com' + wh + '/nature$',
			loremPixelSports        : '^http://lorempixel.com' + wh + '/sports$',
			loremPixelTechnics      : '^http://lorempixel.com' + wh + '/technics$',
			loremPixelTransport     : '^http://lorempixel.com' + wh + '/transport$',
			loremPixelBw            : '^http://lorempixel.com/g' + wh + '$',
			loremPixelAbstractBw    : '^http://lorempixel.com/g' + wh + '/abstract$',
			loremPixelAnimalsBw     : '^http://lorempixel.com/g' + wh + '/animals$',
			loremPixelBusinessBw    : '^http://lorempixel.com/g' + wh + '/business$',
			loremPixelCatsBw        : '^http://lorempixel.com/g' + wh + '/cats$',
			loremPixelCityBw        : '^http://lorempixel.com/g' + wh + '/city$',
			loremPixelFoodBw        : '^http://lorempixel.com/g' + wh + '/food$',
			loremPixelNightlifeBw   : '^http://lorempixel.com/g' + wh + '/nightlife$',
			loremPixelFashionBw     : '^http://lorempixel.com/g' + wh + '/fashion$',
			loremPixelPeopleBw      : '^http://lorempixel.com/g' + wh + '/people$',
			loremPixelNatureBw      : '^http://lorempixel.com/g' + wh + '/nature$',
			loremPixelSportsBw      : '^http://lorempixel.com/g' + wh + '/sports$',
			loremPixelTechnicsBw    : '^http://lorempixel.com/g' + wh + '/technics$',
			loremPixelTransportBw   : '^http://lorempixel.com/g' + wh + '/transport$',
		};

		var keys = Object.keys(matches);

		test.expect(keys.length);

		keys.forEach(function (key) {
			var match = new RegExp(matches[key]);
			test.ok(actual[key].match(match), actual[key] + ' should match ' + matches[key]);
		});

		test.done();
	},
	create_file_20_40 : function (test) {
		test.ok(grunt.file.exists('test/actual/images-20-40.json'), 'Should create files.');

		test.done();
	},
	images_matching_regex_20_40 : function (test) {
		var actual = grunt.file.readJSON('test/actual/images-20-40.json');

		var wh = '/20/40';

		var matches = {
			fillMurray              : '^http://fillmurray.com' + wh + '$',
			fillMurrayBw            : '^http://fillmurray.com/g' + wh + '$',
			placeCage               : '^http://placecage.com' + wh + '$',
			placeCageBw             : '^http://placecage.com/g' + wh + '$',
			placeCageCrazy          : '^http://placecage.com/c' + wh + '$',
			placeBear               : '^http://placebear.com' + wh + '$',
			placeBearBw             : '^http://placebear.com/g' + wh + '$',
			placeDog                : '^http://placedog.com' + wh + '$',
			placeDogBw              : '^http://placedog.com/g' + wh + '$',
			placeKitten             : '^http://placekitten.com' + wh + '$',
			placeKittenBw           : '^http://placekitten.com/g' + wh + '$',
			placeZombie             : '^http://placezombies.com/20x40$',
			placeZombieBw           : '^http://placezombies.com/g/20x40$',
			placeSheen              : '^http://placesheen.com' + wh + '$',
			baconMockup             : '^http://baconmockup.com' + wh + '$',
			loremPixel              : '^http://lorempixel.com' + wh + '$',
			loremPixelAbstract      : '^http://lorempixel.com' + wh + '/abstract$',
			loremPixelAnimals       : '^http://lorempixel.com' + wh + '/animals$',
			loremPixelBusiness      : '^http://lorempixel.com' + wh + '/business$',
			loremPixelCats          : '^http://lorempixel.com' + wh + '/cats$',
			loremPixelCity          : '^http://lorempixel.com' + wh + '/city$',
			loremPixelFood          : '^http://lorempixel.com' + wh + '/food$',
			loremPixelNightlife     : '^http://lorempixel.com' + wh + '/nightlife$',
			loremPixelFashion       : '^http://lorempixel.com' + wh + '/fashion$',
			loremPixelPeople        : '^http://lorempixel.com' + wh + '/people$',
			loremPixelNature        : '^http://lorempixel.com' + wh + '/nature$',
			loremPixelSports        : '^http://lorempixel.com' + wh + '/sports$',
			loremPixelTechnics      : '^http://lorempixel.com' + wh + '/technics$',
			loremPixelTransport     : '^http://lorempixel.com' + wh + '/transport$',
			loremPixelBw            : '^http://lorempixel.com/g' + wh + '$',
			loremPixelAbstractBw    : '^http://lorempixel.com/g' + wh + '/abstract$',
			loremPixelAnimalsBw     : '^http://lorempixel.com/g' + wh + '/animals$',
			loremPixelBusinessBw    : '^http://lorempixel.com/g' + wh + '/business$',
			loremPixelCatsBw        : '^http://lorempixel.com/g' + wh + '/cats$',
			loremPixelCityBw        : '^http://lorempixel.com/g' + wh + '/city$',
			loremPixelFoodBw        : '^http://lorempixel.com/g' + wh + '/food$',
			loremPixelNightlifeBw   : '^http://lorempixel.com/g' + wh + '/nightlife$',
			loremPixelFashionBw     : '^http://lorempixel.com/g' + wh + '/fashion$',
			loremPixelPeopleBw      : '^http://lorempixel.com/g' + wh + '/people$',
			loremPixelNatureBw      : '^http://lorempixel.com/g' + wh + '/nature$',
			loremPixelSportsBw      : '^http://lorempixel.com/g' + wh + '/sports$',
			loremPixelTechnicsBw    : '^http://lorempixel.com/g' + wh + '/technics$',
			loremPixelTransportBw   : '^http://lorempixel.com/g' + wh + '/transport$',
		};

		var keys = Object.keys(matches);

		test.expect(keys.length);

		keys.forEach(function (key) {
			var match = new RegExp(matches[key]);
			test.ok(actual[key].match(match), actual[key] + ' should match ' + matches[key]);
		});

		test.done();
	},
	create_file_random_35 : function (test) {
		test.ok(grunt.file.exists('test/actual/images-random-35.json'), 'Should create files.');

		test.done();
	},
	images_matching_regex_random_35 : function (test) {
		var actual = grunt.file.readJSON('test/actual/images-random-35.json');

		var wh = '/1[0-9]/35';

		var matches = {
			fillMurray              : '^http://fillmurray.com' + wh + '$',
			fillMurrayBw            : '^http://fillmurray.com/g' + wh + '$',
			placeCage               : '^http://placecage.com' + wh + '$',
			placeCageBw             : '^http://placecage.com/g' + wh + '$',
			placeCageCrazy          : '^http://placecage.com/c' + wh + '$',
			placeBear               : '^http://placebear.com' + wh + '$',
			placeBearBw             : '^http://placebear.com/g' + wh + '$',
			placeDog                : '^http://placedog.com' + wh + '$',
			placeDogBw              : '^http://placedog.com/g' + wh + '$',
			placeKitten             : '^http://placekitten.com' + wh + '$',
			placeKittenBw           : '^http://placekitten.com/g' + wh + '$',
			placeZombie             : '^http://placezombies.com/1[0-9]x35$',
			placeZombieBw           : '^http://placezombies.com/g/1[0-9]x35$',
			placeSheen              : '^http://placesheen.com' + wh + '$',
			baconMockup             : '^http://baconmockup.com' + wh + '$',
			loremPixel              : '^http://lorempixel.com' + wh + '$',
			loremPixelAbstract      : '^http://lorempixel.com' + wh + '/abstract$',
			loremPixelAnimals       : '^http://lorempixel.com' + wh + '/animals$',
			loremPixelBusiness      : '^http://lorempixel.com' + wh + '/business$',
			loremPixelCats          : '^http://lorempixel.com' + wh + '/cats$',
			loremPixelCity          : '^http://lorempixel.com' + wh + '/city$',
			loremPixelFood          : '^http://lorempixel.com' + wh + '/food$',
			loremPixelNightlife     : '^http://lorempixel.com' + wh + '/nightlife$',
			loremPixelFashion       : '^http://lorempixel.com' + wh + '/fashion$',
			loremPixelPeople        : '^http://lorempixel.com' + wh + '/people$',
			loremPixelNature        : '^http://lorempixel.com' + wh + '/nature$',
			loremPixelSports        : '^http://lorempixel.com' + wh + '/sports$',
			loremPixelTechnics      : '^http://lorempixel.com' + wh + '/technics$',
			loremPixelTransport     : '^http://lorempixel.com' + wh + '/transport$',
			loremPixelBw            : '^http://lorempixel.com/g' + wh + '$',
			loremPixelAbstractBw    : '^http://lorempixel.com/g' + wh + '/abstract$',
			loremPixelAnimalsBw     : '^http://lorempixel.com/g' + wh + '/animals$',
			loremPixelBusinessBw    : '^http://lorempixel.com/g' + wh + '/business$',
			loremPixelCatsBw        : '^http://lorempixel.com/g' + wh + '/cats$',
			loremPixelCityBw        : '^http://lorempixel.com/g' + wh + '/city$',
			loremPixelFoodBw        : '^http://lorempixel.com/g' + wh + '/food$',
			loremPixelNightlifeBw   : '^http://lorempixel.com/g' + wh + '/nightlife$',
			loremPixelFashionBw     : '^http://lorempixel.com/g' + wh + '/fashion$',
			loremPixelPeopleBw      : '^http://lorempixel.com/g' + wh + '/people$',
			loremPixelNatureBw      : '^http://lorempixel.com/g' + wh + '/nature$',
			loremPixelSportsBw      : '^http://lorempixel.com/g' + wh + '/sports$',
			loremPixelTechnicsBw    : '^http://lorempixel.com/g' + wh + '/technics$',
			loremPixelTransportBw   : '^http://lorempixel.com/g' + wh + '/transport$',
		};

		var keys = Object.keys(matches);

		test.expect(keys.length);

		keys.forEach(function (key) {
			var match = new RegExp(matches[key]);
			test.ok(actual[key].match(match), actual[key] + ' should match ' + matches[key]);
		});

		test.done();
	},
	create_file_random : function (test) {
		test.ok(grunt.file.exists('test/actual/images-random.json'), 'Should create files.');

		test.done();
	},
	images_matching_regex_random : function (test) {
		var actual = grunt.file.readJSON('test/actual/images-random.json');

		var wh = '/3[0-9][0-9]/[5-7][0-9]';

		var matches = {
			fillMurray              : '^http://fillmurray.com' + wh + '$',
			fillMurrayBw            : '^http://fillmurray.com/g' + wh + '$',
			placeCage               : '^http://placecage.com' + wh + '$',
			placeCageBw             : '^http://placecage.com/g' + wh + '$',
			placeCageCrazy          : '^http://placecage.com/c' + wh + '$',
			placeBear               : '^http://placebear.com' + wh + '$',
			placeBearBw             : '^http://placebear.com/g' + wh + '$',
			placeDog                : '^http://placedog.com' + wh + '$',
			placeDogBw              : '^http://placedog.com/g' + wh + '$',
			placeKitten             : '^http://placekitten.com' + wh + '$',
			placeKittenBw           : '^http://placekitten.com/g' + wh + '$',
			placeZombie             : '^http://placezombies.com/3[0-9][0-9]x[5-7][0-9]$',
			placeZombieBw           : '^http://placezombies.com/g/3[0-9][0-9]x[5-7][0-9]$',
			placeSheen              : '^http://placesheen.com' + wh + '$',
			baconMockup             : '^http://baconmockup.com' + wh + '$',
			loremPixel              : '^http://lorempixel.com' + wh + '$',
			loremPixelAbstract      : '^http://lorempixel.com' + wh + '/abstract$',
			loremPixelAnimals       : '^http://lorempixel.com' + wh + '/animals$',
			loremPixelBusiness      : '^http://lorempixel.com' + wh + '/business$',
			loremPixelCats          : '^http://lorempixel.com' + wh + '/cats$',
			loremPixelCity          : '^http://lorempixel.com' + wh + '/city$',
			loremPixelFood          : '^http://lorempixel.com' + wh + '/food$',
			loremPixelNightlife     : '^http://lorempixel.com' + wh + '/nightlife$',
			loremPixelFashion       : '^http://lorempixel.com' + wh + '/fashion$',
			loremPixelPeople        : '^http://lorempixel.com' + wh + '/people$',
			loremPixelNature        : '^http://lorempixel.com' + wh + '/nature$',
			loremPixelSports        : '^http://lorempixel.com' + wh + '/sports$',
			loremPixelTechnics      : '^http://lorempixel.com' + wh + '/technics$',
			loremPixelTransport     : '^http://lorempixel.com' + wh + '/transport$',
			loremPixelBw            : '^http://lorempixel.com/g' + wh + '$',
			loremPixelAbstractBw    : '^http://lorempixel.com/g' + wh + '/abstract$',
			loremPixelAnimalsBw     : '^http://lorempixel.com/g' + wh + '/animals$',
			loremPixelBusinessBw    : '^http://lorempixel.com/g' + wh + '/business$',
			loremPixelCatsBw        : '^http://lorempixel.com/g' + wh + '/cats$',
			loremPixelCityBw        : '^http://lorempixel.com/g' + wh + '/city$',
			loremPixelFoodBw        : '^http://lorempixel.com/g' + wh + '/food$',
			loremPixelNightlifeBw   : '^http://lorempixel.com/g' + wh + '/nightlife$',
			loremPixelFashionBw     : '^http://lorempixel.com/g' + wh + '/fashion$',
			loremPixelPeopleBw      : '^http://lorempixel.com/g' + wh + '/people$',
			loremPixelNatureBw      : '^http://lorempixel.com/g' + wh + '/nature$',
			loremPixelSportsBw      : '^http://lorempixel.com/g' + wh + '/sports$',
			loremPixelTechnicsBw    : '^http://lorempixel.com/g' + wh + '/technics$',
			loremPixelTransportBw   : '^http://lorempixel.com/g' + wh + '/transport$',
		};

		var keys = Object.keys(matches);

		test.expect(keys.length);

		keys.forEach(function (key) {
			var match = new RegExp(matches[key]);
			test.ok(actual[key].match(match), actual[key] + ' should match ' + matches[key]);
		});

		test.done();
	},
};
