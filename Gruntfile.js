/*
 * grunt-fake
 * https://github.com/timwood/grunt-fake
 *
 * Copyright (c) 2013 Tim Wood
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc',
			},
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			]
		},
		clean: {
			tests: ['test/actual'],
		},
		nodeunit: {
			tests: ['test/tests/*.js'],
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadTasks('test/tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['clean', 'ipsum', 'nodeunit']);

	grunt.registerTask('default', ['jshint', 'test']);
};
