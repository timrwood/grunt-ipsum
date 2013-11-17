module.exports = function (grunt) {
	grunt.config('ipsum.faker', {
		dest : 'test/actual/faker.json',
		template : {
			name                : '{%= ipsum.name() %}',
			firstName           : '{%= ipsum.firstName %}',
			lastName            : '{%= ipsum.lastName %}',
			zipCode             : '{%= ipsum.zipCode %}',
			zipCodeFormat       : '{%= ipsum.zipCodeFormat(0) %}',
			city                : '{%= ipsum.city %}',
			streetName          : '{%= ipsum.streetName %}',
			streetAddress       : '{%= ipsum.streetAddress %}',
			secondaryAddress    : '{%= ipsum.secondaryAddress %}',
			brState             : '{%= ipsum.brState %}',
			ukCounty            : '{%= ipsum.ukCounty %}',
			ukCountry           : '{%= ipsum.ukCountry %}',
			usState             : '{%= ipsum.usState %}',
			latitude            : '{%= ipsum.latitude %}',
			longitude           : '{%= ipsum.longitude %}',
			phoneNumber         : '{%= ipsum.phoneNumber %}',
			phoneNumberFormat   : '{%= ipsum.phoneNumberFormat(0) %}',
			email               : '{%= ipsum.email %}',
			userName            : '{%= ipsum.userName %}',
			domainName          : '{%= ipsum.domainName %}',
			domainWord          : '{%= ipsum.domainWord %}',
			ip                  : '{%= ipsum.ip %}',
			companyName         : '{%= ipsum.companyName %}',
			companySuffix       : '{%= ipsum.companySuffix %}',
			catchPhrase         : '{%= ipsum.catchPhrase %}',
			bs                  : '{%= ipsum.bs %}'
		}
	});
};
