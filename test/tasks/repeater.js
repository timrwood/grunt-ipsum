module.exports = function (grunt) {
	grunt.config('ipsum.repeater', {
		dest : 'test/actual/repeater.json',
		template : {
			name : '{%= ipsum.name %}',
			city : '{%= ipsum.city %}',
		},
		repeat : 4,
		repetitions : {
			name : 3,
			city : 2
		}
	});
};
