# grunt-ipsum [![Build Status](https://travis-ci.org/timrwood/grunt-ipsum.png?branch=master)](https://travis-ci.org/timrwood/grunt-ipsum) [![Code Climate](https://codeclimate.com/github/timrwood/grunt-ipsum.png)](https://codeclimate.com/github/timrwood/grunt-ipsum)

> Generate lots of fake data.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ipsum --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-less');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-less/tree/grunt-0.3-stable).*

## Ipsum task
_Run this task with the `grunt ipsum` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### dest `String`

Path to save output file.

#### template `Object|Array`

The schema of fake data to generate.

```js
grunt.config('ipsum.mytask', {
	template : {
		name : {
			first : '{%= ipsum.firstName %}',
			last : '{%= ipsum.lastName %}',
		},
		street : '{%= ipsum.streetName %}',
		city : '{%= ipsum.city %}',
		state : '{%= ipsum.usState %}',
	}
});
// Output
{
	"name": {
		"first": "Janie",
		"last": "Mertz"
	},
	"street": "Ardith Brook",
	"city": "Hertafurt",
	"state": "Rhode Island"
}
```

Each value is compiled with `_.template` using the `{%` and `%}` delimiters. Both the [grunt template](http://gruntjs.com/api/grunt.template#helpers) and [underscore.string](https://github.com/epeli/underscore.string) helpers are available in this context.

```js
grunt.config('ipsum.mytask', {
	template : {
		date : '{%= grunt.template.date(847602000000, "yyyy-mm-dd") %}',
		slug : '{%= _.slugify(ipsum.name) %}'
	}
});
// Output
{
	"date": "1996-11-09",
	"slug": "hobart-torp"
}
```

The current object is available via the `self` keyword. Note that this will only work after previous keys are set.

```js
grunt.config('ipsum.mytask', {
	template : {
		name : '{%= ipsum.name %}',
		slug : '{%= _.slugify(self.name) %}',
		notyetdefined : '{%= self.after %}',
		after : 'needs to be before notyetdefined'
	}
});
// Output
{
	"name": "Stephen Abshire",
	"slug": "stephen-abshire",
	"notyetdefined": "",
	"after": "needs to be before notyetdefined"
}
```

The values available in the template context are based on [Faker.js](https://github.com/marak/Faker.js/).

<table>
	<tr>
		<th>Ipsum property</th>
		<th>Source</th>
	</tr>
	<tr>
		<td>ipsum.name</td>
		<td>Faker.Name.findName</td>
	</tr>
	<tr>
		<td>ipsum.firstName</td>
		<td>Faker.Name.firstName</td>
	</tr>
	<tr>
		<td>ipsum.lastName</td>
		<td>Faker.Name.lastName</td>
	</tr>

	<tr>
		<td>ipsum.zipCode</td>
		<td>Faker.Address.zipCode</td>
	</tr>
	<tr>
		<td>ipsum.zipCodeFormat</td>
		<td>Faker.Address.zipCodeFormat</td>
	</tr>
	<tr>
		<td>ipsum.city</td>
		<td>Faker.Address.city</td>
	</tr>
	<tr>
		<td>ipsum.streetAddress</td>
		<td>Faker.Address.streetAddress</td>
	</tr>
	<tr>
		<td>ipsum.streetAddress</td>
		<td>Faker.Address.streetAddress</td>
	</tr>
	<tr>
		<td>ipsum.secondaryAddress</td>
		<td>Faker.Address.secondaryAddress</td>
	</tr>
	<tr>
		<td>ipsum.brState</td>
		<td>Faker.Address.brState</td>
	</tr>
	<tr>
		<td>ipsum.ukCounty</td>
		<td>Faker.Address.ukCounty</td>
	</tr>
	<tr>
		<td>ipsum.ukCountry</td>
		<td>Faker.Address.ukCountry</td>
	</tr>
	<tr>
		<td>ipsum.usState</td>
		<td>Faker.Address.usState</td>
	</tr>
	<tr>
		<td>ipsum.latitude</td>
		<td>Faker.Address.latitude</td>
	</tr>
	<tr>
		<td>ipsum.longitude</td>
		<td>Faker.Address.longitude</td>
	</tr>
</table>
