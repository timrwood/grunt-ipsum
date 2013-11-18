var getter = require('./getter'),
	grunt = require('grunt'),
	Faker = require('Faker'),
	Name = Faker.Name,
	Address = Faker.Address,
	PhoneNumber = Faker.PhoneNumber,
	Internet = Faker.Internet,
	Company = Faker.Company;

module.exports = {};

function map(key, cb, defaults) {
	getter(module.exports, key, cb, defaults);
	return map;
}

map('name',                    Name.findName.bind(Name))
('firstName',                  Name.firstName.bind(Name))
('lastName',                   Name.lastName.bind(Name))
('zipCode',                 Address.zipCode.bind(Address))
('zipCodeFormat',           Address.zipCodeFormat.bind(Address), [0])
('city',                    Address.city.bind(Address))
('streetName',              Address.streetName.bind(Address))
('streetAddress',           Address.streetAddress.bind(Address))
('secondaryAddress',        Address.secondaryAddress.bind(Address))
('brState',                 Address.brState.bind(Address))
('ukCounty',                Address.ukCounty.bind(Address))
('ukCountry',               Address.ukCountry.bind(Address))
('usState',                 Address.usState.bind(Address))
('latitude',                Address.latitude.bind(Address))
('longitude',               Address.longitude.bind(Address))
('phoneNumber',         PhoneNumber.phoneNumber.bind(PhoneNumber))
('phoneNumberFormat',   PhoneNumber.phoneNumberFormat.bind(PhoneNumber), [0])
('email',                  Internet.email.bind(Internet))
('userName',               Internet.userName.bind(Internet))
('domainName',             Internet.domainName.bind(Internet))
('domainWord',             Internet.domainWord.bind(Internet))
('ip',                     Internet.ip.bind(Internet))
('companyName',             Company.companyName.bind(Company))
('companySuffix',           Company.companySuffix.bind(Company))
('catchPhrase',             Company.catchPhrase.bind(Company))
('bs',                      Company.bs.bind(Company));

function widthHeightValue(arr) {
	if (grunt.util.kindOf(arr) === 'array') {
		return arr[0] + Math.floor((Math.random() * (arr[1] - arr[0])));
	}
	return arr;
}

function img(key, url) {
	getter(module.exports, key, function (w, h) {
		w = widthHeightValue(w);
		h = widthHeightValue(h);
		return url.replace('%w', w).replace('%h', h);
	}, [[100, 500], [100, 500]]);
	return img;
}

img('niceNice',     'http://nicenicejpg.com/%w/%h')
('niceNiceMustang', 'http://nicenicejpg.com/5.0/%w/%h')
('fillMurray',      'http://fillmurray.com/%w/%h')
('fillMurrayBw',    'http://fillmurray.com/g/%w/%h')
('placeCage',       'http://placecage.com/%w/%h')
('placeCageBw',     'http://placecage.com/g/%w/%h')
('placeCageCrazy',  'http://placecage.com/c/%w/%h')
('placeBear',       'http://placebear.com/%w/%h')
('placeBearBw',     'http://placebear.com/g/%w/%h')
('placeDog',        'http://placedog.com/%w/%h')
('placeDogBw',      'http://placedog.com/g/%w/%h')
('placeKitten',     'http://placekitten.com/%w/%h')
('placeKittenBw',   'http://placekitten.com/g/%w/%h')
('placeZombie',     'http://placezombies.com/%wx%h')
('placeZombieBw',   'http://placezombies.com/g/%wx%h')
('placeSheen',      'http://placesheen.com/%w/%h')
('baconMockup',     'http://baconmockup.com/%w/%h')
('loremPixel',      'http://lorempixel.com/%w/%h')
('loremPixelBw',    'http://lorempixel.com/g/%w/%h');

function loremPixel(category) {
	img('loremPixel' + category, 'http://lorempixel.com/%w/%h/' + category.toLowerCase())
	('loremPixel' + category + 'Bw', 'http://lorempixel.com/g/%w/%h/' + category.toLowerCase());
	return loremPixel;
}

loremPixel('Abstract')
('Animals')
('Business')
('Cats')
('City')
('Food')
('Nightlife')
('Fashion')
('People')
('Nature')
('Sports')
('Technics')
('Transport');