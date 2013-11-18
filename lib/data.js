var getter = require('./getter'),
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
