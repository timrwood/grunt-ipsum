module.exports = function (grunt) {
	grunt.config('ipsum.availibility', {
		dest : 'test/actual/availibility.json',
		template : {
			a : 'alpha',
			b : 'beta'
		},
		availibility : {
			a : 1,
			b : 0
		}
	});
};
