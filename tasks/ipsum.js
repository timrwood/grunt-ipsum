/*
 * grunt-ipsum
 * https://github.com/timrwood/grunt-ipsum
 *
 * Copyright (c) 2013 Tim Wood
 * Licensed under the MIT license.
 */

'use strict';

var data = require('../lib/data'),
	replacer = require('../lib/replacer'),
	repeater = require('../lib/repeater');

module.exports = function (grunt) {
	grunt.registerMultiTask('ipsum', 'Generate fake data.', function () {
		this.files.forEach(function (file) {
			var repeated = repeater(file.template, file.repeat, file.repetitions);
			var replaced = replacer(repeated, { ipsum : data });
			grunt.file.write(file.dest, JSON.stringify(replaced, null, '\t'));
		});
	});
};
