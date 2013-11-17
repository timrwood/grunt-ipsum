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
	grunt.config('ipsum.repeater_random', {
		dest : 'test/actual/repeater_random.json',
		template : {
			name : '{%= ipsum.name %}',
			city : '{%= ipsum.city %}',
		},
		repeat : [5, 10],
		repetitions : {
			name : [1, 5],
			city : [1, 5]
		}
	});
};
