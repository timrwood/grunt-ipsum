/*
 * grunt-ipsum
 * https://github.com/timrwood/grunt-ipsum
 *
 * Copyright (c) 2013 Tim Wood
 * Licensed under the MIT license.
 */

'use strict';

var data = require('../lib/data'),
	replacer = require('../lib/replacer');

module.exports = function (grunt) {
	grunt.registerMultiTask('ipsum', 'Generate fake data.', function () {
		this.files.forEach(function (file) {
			grunt.file.write(file.dest, JSON.stringify(replacer(file.template, {
				ipsum : data
			}), null, '\t'));
		});
	});
};
