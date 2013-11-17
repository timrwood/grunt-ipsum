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
grunt.loadNpmTasks('grunt-ipsum');
```

## Ipsum task
_Run this task with the `grunt ipsum` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### dest `String`

Path to save output file.


```js
grunt.config('ipsum.mytask', {
	dest : 'path/to/file.json'
});
```

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
	<tr>
		<td>ipsum.phoneNumber</td>
		<td>Faker.PhoneNumber.phoneNumber</td>
	</tr>
	<tr>
		<td>ipsum.phoneNumberFormat</td>
		<td>Faker.PhoneNumber.phoneNumberFormat</td>
	</tr>
	<tr>
		<td>ipsum.email</td>
		<td>Faker.Internet.email</td>
	</tr>
	<tr>
		<td>ipsum.userName</td>
		<td>Faker.Internet.userName</td>
	</tr>
	<tr>
		<td>ipsum.domainName</td>
		<td>Faker.Internet.domainName</td>
	</tr>
	<tr>
		<td>ipsum.domainWord</td>
		<td>Faker.Internet.domainWord</td>
	</tr>
	<tr>
		<td>ipsum.ip</td>
		<td>Faker.Internet.ip</td>
	</tr>
	<tr>
		<td>ipsum.companyName</td>
		<td>Faker.Company.companyName</td>
	</tr>
	<tr>
		<td>ipsum.companySuffix</td>
		<td>Faker.Company.companySuffix</td>
	</tr>
	<tr>
		<td>ipsum.catchPhrase</td>
		<td>Faker.Company.catchPhrase</td>
	</tr>
	<tr>
		<td>ipsum.bs</td>
		<td>Faker.Company.bs</td>
	</tr>
</table>


#### repeat `Number|Array`

The number of times to repeat the template.

```js
grunt.config('ipsum.mytask', {
	template : {
		name : '{%= ipsum.name %}'
	},
	repeat : 5
});
// Outputs
[
	{
		"name": "Lori Hegmann"
	},
	{
		"name": "Vernie Deckow"
	},
	{
		"name": "Karlee Schowalter"
	},
	{
		"name": "Mya Hahn"
	},
	{
		"name": "Colin Strosin"
	}
]
```

If the value is an array, the template will be repeated a random number of times between the two values.

```js
grunt.config('ipsum.mytask', {
	template : {
		name : '{%= ipsum.name %}'
	},
	repeat : [1, 20]
});
// Outputs 1 to 20 results
[
	{
		"name": "Lori Hegmann"
	},
	// ...
	{
		"name": "Colin Strosin"
	}
]
```



#### repetitions `Object`

The number of times to repeat nested items.

```js
grunt.config('ipsum.mytask', {
	template : {
		name : '{%= ipsum.name %}',
		children : {
			name : '{%= ipsum.name %}'
		}
	},
	repetitions : {
		'children' : 3
	}
});
// Outputs
{
	"name": "Rosanna Predovic",
	"children": [
		{
			"name": "Mr. Karlie Jast"
		},
		{
			"name": "Sabina Hoppe"
		},
		{
			"name": "Jordon Friesen"
		}
	]
}
```

This also works for deep nested paths.

```js
grunt.config('ipsum.mytask', {
	template : {
		name : '{%= ipsum.name %}',
		children : {
			child_name : '{%= ipsum.name %}',
			friends : {
				friend_name : '{%= ipsum.name %}'
			}
		}
	},
	repetitions : {
		'children' : 2,
		'children.friends' : 3
	}
});
// Outputs
{
	"name": "Johnnie Kutch",
	"children": [
		{
			"child_name": "Ms. Charlene Jacobi",
			"friends": [
				{
					"friend_name": "Martin Hilpert"
				},
				{
					"friend_name": "Price Murray"
				},
				{
					"friend_name": "Jermain Mosciski"
				}
			]
		},
		{
			"child_name": "Barrett Connelly",
			"friends": [
				{
					"friend_name": "Mrs. Ethel Cremin"
				},
				{
					"friend_name": "Weldon Muller"
				},
				{
					"friend_name": "Aurelia Parisian"
				}
			]
		}
	]
```

As with the `repeat` option, if the value is an array, a random number will be chosen between the two values.

```js
grunt.config('ipsum.mytask', {
	template : {
		name : '{%= ipsum.name %}',
		children : {
			name : '{%= ipsum.name %}'
		}
	},
	repetitions : {
		'children' : [1, 10]
	}
});
// Outputs
{
	"name": "Rosanna Predovic",
	"children": [ // 1 to 10 children
		{
			"name": "Mr. Karlie Jast"
		},
		// ...
		{
			"name": "Jordon Friesen"
		}
	]
}
```

