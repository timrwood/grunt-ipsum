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

## Template keys and examples

### Users

<table>
	<tr>
		<th>Key</th>
		<th>Examples</th>
	</tr>
	<tr>
		<td>name</td>
		<td>Maeve Homenick, Owen Mraz, Bernardo Grimes</td>
	</tr>
	<tr>
		<td>firstName</td>
		<td>Braxton, Susana, Marcelle</td>
	</tr>
	<tr>
		<td>lastName</td>
		<td>Kuphal, Hand, Effertz</td>
	</tr>
	<tr>
		<td>phoneNumber</td>
		<td>003-273-1853 x1157, 847.322.7960, 357.014.4721</td>
	</tr>
	<tr>
		<td>phoneNumberFormat(0)</td>
		<td>979-083-1591, 213-279-0050, 909-907-7814</td>
	</tr>
	<tr>
		<td>phoneNumberFormat(1)</td>
		<td>(012)512-0615, (946)971-1172, (572)007-5316</td>
	</tr>
	<tr>
		<td>phoneNumberFormat(2)</td>
		<td>1-976-102-1694, 1-961-173-9743, 1-247-057-0318</td>
	</tr>
	<tr>
		<td>email</td>
		<td>Carolyn@frederick.biz, Lukas@katarina.me, Reuben.Kuhlman@joesph.name</td>
	</tr>
	<tr>
		<td>userName</td>
		<td>Alek, Santina_Streich, Vallie.Morar</td>
	</tr>
</table>

### Companies

<table>
	<tr>
		<th>Key</th>
		<th>Examples</th>
	</tr>
	<tr>
		<td>domainName</td>
		<td>breanne.biz, flo.ca, susie.io</td>
	</tr>
	<tr>
		<td>domainWord</td>
		<td>nayeli, ottilie, joany</td>
	</tr>
	<tr>
		<td>ip</td>
		<td>70.107.229.179, 40.84.165.142, 200.31.231.91</td>
	</tr>
	<tr>
		<td>companyName</td>
		<td>Erdman, Dietrich and Schamberger<br/>Kulas-Moore<br/>Dare-Pfeffer</td>
	</tr>
	<tr>
		<td>companySuffix</td>
		<td>and Sons, Group, LLC</td>
	</tr>
	<tr>
		<td>catchPhrase</td>
		<td>Persistent executive service-desk<br/>Sharable motivating standardization<br/>Face to face global knowledge base</td>
	</tr>
	<tr>
		<td>bs</td>
		<td>whiteboard synergistic web-readiness<br/>enhance web-enabled schemas<br/>reintermediate wireless systems</td>
	</tr>
</table>

### Addresses

<table>
	<tr>
		<th>Key</th>
		<th>Examples</th>
	</tr>
	<tr>
		<td>streetAddress</td>
		<td>220 Marks Plain<br/>928 Hyatt Place<br/>46420 Cornell Row</td>
	</tr>
	<tr>
		<td>secondaryAddress</td>
		<td>Apt. 241, Suite 081, Apt. 883</td>
	</tr>
	<tr>
		<td>city</td>
		<td>Luciennetown, South Kiana, Gibsonstad</td>
	</tr>
	<tr>
		<td>usState</td>
		<td>New Hampshire, Oklahoma, Kentucky</td>
	</tr>
	<tr>
		<td>brState</td>
		<td>Ceará, Distrito Federal, Pernambuco</td>
	</tr>
	<tr>
		<td>ukCounty</td>
		<td>Surrey, Derbyshire, West Midlands</td>
	</tr>
	<tr>
		<td>ukCountry</td>
		<td>Scotland, England, Wales</td>
	</tr>
	<tr>
		<td>zipCode</td>
		<td>39368-1361, 35290, 62938-6427</td>
	</tr>
	<tr>
		<td>zipCodeFormat(0)</td>
		<td>10812, 37427, 17078</td>
	</tr>
	<tr>
		<td>zipCodeFormat(1)</td>
		<td>49563-3194, 72511-9477, 40840-7183</td>
	</tr>
	<tr>
		<td>latitude</td>
		<td>-56.8358, 79.0189, 28.3439</td>
	</tr>
	<tr>
		<td>longitude</td>
		<td>14.0440, 137.2489, -108.3675</td>
	</tr>
</table>

### Images

Each of the image options can accept two parameters, width and height.

```js
grunt.config('ipsum.mytask', {
	template : {
		thumb : '{%= ipsum.placeKitten(400, 300) %}'
	}
});
// Outputs
{
	"thumb": "http://placekitten.com/400/300"
}
```

If an array is used, a number will be chosen within that range.

```js
grunt.config('ipsum.mytask', {
	template : {
		thumb : '{%= ipsum.placeKitten([10, 40], [500, 600]) %}'
	}
});
// Outputs
{
	"thumb": "http://placekitten.com/23/574"
}
```

The range defaults to `[100, 500]`.

```js
grunt.config('ipsum.mytask', {
	template : {
		thumb : '{%= ipsum.placeKitten %}'
	}
});
// Outputs
{
	"thumb": "http://placekitten.com/246/437"
}
```

<table>
	<tr>
		<th>Key</th>
		<th>Examples</th>
	</tr>
	<tr>
		<td>niceNice</td>
		<td><a href="http://nicenicejpg.com/160/90" target="_blank">http://nicenicejpg.com/160/90</a></td>
	</tr>
	<tr>
		<td>niceNiceMustang</td>
		<td><a href="http://nicenicejpg.com/5.0/160/90" target="_blank">http://nicenicejpg.com/5.0/160/90</a></td>
	</tr>
	<tr>
		<td>fillMurray</td>
		<td><a href="http://fillmurray.com/160/90" target="_blank">http://fillmurray.com/160/90</a></td>
	</tr>
	<tr>
		<td>fillMurrayBw</td>
		<td><a href="http://fillmurray.com/g/160/90" target="_blank">http://fillmurray.com/g/160/90</a></td>
	</tr>
	<tr>
		<td>placeCage</td>
		<td><a href="http://placecage.com/160/90" target="_blank">http://placecage.com/160/90</a></td>
	</tr>
	<tr>
		<td>placeCageBw</td>
		<td><a href="http://placecage.com/g/160/90" target="_blank">http://placecage.com/g/160/90</a></td>
	</tr>
	<tr>
		<td>placeCageCrazy</td>
		<td><a href="http://placecage.com/c/160/90" target="_blank">http://placecage.com/c/160/90</a></td>
	</tr>
	<tr>
		<td>placeBear</td>
		<td><a href="http://placebear.com/160/90" target="_blank">http://placebear.com/160/90</a></td>
	</tr>
	<tr>
		<td>placeBearBw</td>
		<td><a href="http://placebear.com/g/160/90" target="_blank">http://placebear.com/g/160/90</a></td>
	</tr>
	<tr>
		<td>placeDog</td>
		<td><a href="http://placedog.com/160/90" target="_blank">http://placedog.com/160/90</a></td>
	</tr>
	<tr>
		<td>placeDogBw</td>
		<td><a href="http://placedog.com/g/160/90" target="_blank">http://placedog.com/g/160/90</a></td>
	</tr>
	<tr>
		<td>placeKitten</td>
		<td><a href="http://placekitten.com/160/90" target="_blank">http://placekitten.com/160/90</a></td>
	</tr>
	<tr>
		<td>placeKittenBw</td>
		<td><a href="http://placekitten.com/g/160/90" target="_blank">http://placekitten.com/g/160/90</a></td>
	</tr>
	<tr>
		<td>placeZombie</td>
		<td><a href="http://placezombies.com/160x90" target="_blank">http://placezombies.com/160x90</a></td>
	</tr>
	<tr>
		<td>placeZombieBw</td>
		<td><a href="http://placezombies.com/g/160x90" target="_blank">http://placezombies.com/g/160x90</a></td>
	</tr>
	<tr>
		<td>placeSheen</td>
		<td><a href="http://placesheen.com/160/90" target="_blank">http://placesheen.com/160/90</a></td>
	</tr>
	<tr>
		<td>baconMockup</td>
		<td><a href="http://baconmockup.com/160/90" target="_blank">http://baconmockup.com/160/90</a></td>
	</tr>
	<tr>
		<td>loremPixel</td>
		<td><a href="http://lorempixel.com/160/90" target="_blank">http://lorempixel.com/160/90</a></td>
	</tr>
	<tr>
		<td>loremPixelAbstract</td>
		<td><a href="http://lorempixel.com/160/90/abstract" target="_blank">http://lorempixel.com/160/90/abstract</a></td>
	</tr>
	<tr>
		<td>loremPixelAnimals</td>
		<td><a href="http://lorempixel.com/160/90/animals" target="_blank">http://lorempixel.com/160/90/animals</a></td>
	</tr>
	<tr>
		<td>loremPixelBusiness</td>
		<td><a href="http://lorempixel.com/160/90/business" target="_blank">http://lorempixel.com/160/90/business</a></td>
	</tr>
	<tr>
		<td>loremPixelCats</td>
		<td><a href="http://lorempixel.com/160/90/cats" target="_blank">http://lorempixel.com/160/90/cats</a></td>
	</tr>
	<tr>
		<td>loremPixelCity</td>
		<td><a href="http://lorempixel.com/160/90/city" target="_blank">http://lorempixel.com/160/90/city</a></td>
	</tr>
	<tr>
		<td>loremPixelFood</td>
		<td><a href="http://lorempixel.com/160/90/food" target="_blank">http://lorempixel.com/160/90/food</a></td>
	</tr>
	<tr>
		<td>loremPixelNightlife</td>
		<td><a href="http://lorempixel.com/160/90/nightlife" target="_blank">http://lorempixel.com/160/90/nightlife</a></td>
	</tr>
	<tr>
		<td>loremPixelFashion</td>
		<td><a href="http://lorempixel.com/160/90/fashion" target="_blank">http://lorempixel.com/160/90/fashion</a></td>
	</tr>
	<tr>
		<td>loremPixelPeople</td>
		<td><a href="http://lorempixel.com/160/90/people" target="_blank">http://lorempixel.com/160/90/people</a></td>
	</tr>
	<tr>
		<td>loremPixelNature</td>
		<td><a href="http://lorempixel.com/160/90/nature" target="_blank">http://lorempixel.com/160/90/nature</a></td>
	</tr>
	<tr>
		<td>loremPixelSports</td>
		<td><a href="http://lorempixel.com/160/90/sports" target="_blank">http://lorempixel.com/160/90/sports</a></td>
	</tr>
	<tr>
		<td>loremPixelTechnics</td>
		<td><a href="http://lorempixel.com/160/90/technics" target="_blank">http://lorempixel.com/160/90/technics</a></td>
	</tr>
	<tr>
		<td>loremPixelTransport</td>
		<td><a href="http://lorempixel.com/160/90/transport" target="_blank">http://lorempixel.com/160/90/transport</a></td>
	</tr>
	<tr>
		<td>loremPixelBw</td>
		<td><a href="http://lorempixel.com/g/160/90" target="_blank">http://lorempixel.com/g/160/90</a></td>
	</tr>
	<tr>
		<td>loremPixelAbstractBw</td>
		<td><a href="http://lorempixel.com/g/160/90/abstract" target="_blank">http://lorempixel.com/g/160/90/abstract</a></td>
	</tr>
	<tr>
		<td>loremPixelAnimalsBw</td>
		<td><a href="http://lorempixel.com/g/160/90/animals" target="_blank">http://lorempixel.com/g/160/90/animals</a></td>
	</tr>
	<tr>
		<td>loremPixelBusinessBw</td>
		<td><a href="http://lorempixel.com/g/160/90/business" target="_blank">http://lorempixel.com/g/160/90/business</a></td>
	</tr>
	<tr>
		<td>loremPixelCatsBw</td>
		<td><a href="http://lorempixel.com/g/160/90/cats" target="_blank">http://lorempixel.com/g/160/90/cats</a></td>
	</tr>
	<tr>
		<td>loremPixelCityBw</td>
		<td><a href="http://lorempixel.com/g/160/90/city" target="_blank">http://lorempixel.com/g/160/90/city</a></td>
	</tr>
	<tr>
		<td>loremPixelFoodBw</td>
		<td><a href="http://lorempixel.com/g/160/90/food" target="_blank">http://lorempixel.com/g/160/90/food</a></td>
	</tr>
	<tr>
		<td>loremPixelNightlifeBw</td>
		<td><a href="http://lorempixel.com/g/160/90/nightlife" target="_blank">http://lorempixel.com/g/160/90/nightlife</a></td>
	</tr>
	<tr>
		<td>loremPixelFashionBw</td>
		<td><a href="http://lorempixel.com/g/160/90/fashion" target="_blank">http://lorempixel.com/g/160/90/fashion</a></td>
	</tr>
	<tr>
		<td>loremPixelPeopleBw</td>
		<td><a href="http://lorempixel.com/g/160/90/people" target="_blank">http://lorempixel.com/g/160/90/people</a></td>
	</tr>
	<tr>
		<td>loremPixelNatureBw</td>
		<td><a href="http://lorempixel.com/g/160/90/nature" target="_blank">http://lorempixel.com/g/160/90/nature</a></td>
	</tr>
	<tr>
		<td>loremPixelSportsBw</td>
		<td><a href="http://lorempixel.com/g/160/90/sports" target="_blank">http://lorempixel.com/g/160/90/sports</a></td>
	</tr>
	<tr>
		<td>loremPixelTechnicsBw</td>
		<td><a href="http://lorempixel.com/g/160/90/technics" target="_blank">http://lorempixel.com/g/160/90/technics</a></td>
	</tr>
	<tr>
		<td>loremPixelTransportBw</td>
		<td><a href="http://lorempixel.com/g/160/90/transport" target="_blank">http://lorempixel.com/g/160/90/transport</a></td>
	</tr>
</table>