module.exports = function (grunt) {
	grunt.config('ipsum.base', {
		dest : 'test/actual/base.json',
		template : {
			a : 'alpha',
			b : 'beta',
			one : 1,
			two : 2,
			nest : {
				c : 'cat',
				d : 'dog',
				deep : {
					prop : true
				}
			},
			array : [
				'four',
				5
			]
		}
	});
};
