var getter = require('./getter'),
	Faker = require('Faker');

var fakerMap = {
	name                : Faker.Name.findName.bind(Faker.Name),
	firstName           : Faker.Name.firstName.bind(Faker.Name),
	lastName            : Faker.Name.lastName.bind(Faker.Name),
	zipCode             : Faker.Address.zipCode.bind(Faker.Address),
	zipCodeFormat       : Faker.Address.zipCodeFormat.bind(Faker.Address),
	city                : Faker.Address.city.bind(Faker.Address),
	streetName          : Faker.Address.streetName.bind(Faker.Address),
	streetAddress       : Faker.Address.streetAddress.bind(Faker.Address),
	secondaryAddress    : Faker.Address.secondaryAddress.bind(Faker.Address),
	brState             : Faker.Address.brState.bind(Faker.Address),
	ukCounty            : Faker.Address.ukCounty.bind(Faker.Address),
	ukCountry           : Faker.Address.ukCountry.bind(Faker.Address),
	usState             : Faker.Address.usState.bind(Faker.Address),
	latitude            : Faker.Address.latitude.bind(Faker.Address),
	longitude           : Faker.Address.longitude.bind(Faker.Address),
	phoneNumber         : Faker.PhoneNumber.phoneNumber.bind(Faker.PhoneNumber),
	phoneNumberFormat   : Faker.PhoneNumber.phoneNumberFormat.bind(Faker.PhoneNumber),
	email               : Faker.Internet.email.bind(Faker.Internet),
	userName            : Faker.Internet.userName.bind(Faker.Internet),
	domainName          : Faker.Internet.domainName.bind(Faker.Internet),
	domainWord          : Faker.Internet.domainWord.bind(Faker.Internet),
	ip                  : Faker.Internet.ip.bind(Faker.Internet),
	companyName         : Faker.Company.companyName.bind(Faker.Company),
	companySuffix       : Faker.Company.companySuffix.bind(Faker.Company),
	catchPhrase         : Faker.Company.catchPhrase.bind(Faker.Company),
	bs                  : Faker.Company.bs.bind(Faker.Company)
};

module.exports = {};

Object.keys(fakerMap).forEach(function (key) {
	getter(module.exports, key, fakerMap[key]);
});
