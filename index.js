var program = require('commander')
	, pkg = require('./package.json')
	, url = require('url')
	, fs = require('fs')

var urlValidator = function (theUrl) {
	var reUrl = /^https?:\/\/(?:(\w+)(?:[:](\w+))?[@])?([A-Za-z0-9-]+(?:[.][A-Za-z0-9-]+)*|(\d{1,3}(?:[.]\d{1,3}){3}))[:](\d+)$/
	return reUrl.exec(theUrl) === null? false: theUrl
}

var loadSettings = function () {
	var settings = {}
		, keys = ['http', 'https', 'same']
		, obj = {}
		, props
	console.log('Loading settings...')

	try {
		settings = fs.readFileSync('./settings.json')
		settings = JSON.parse(settings)
		props = Object.getOwnPropertyNames(settings)
	} catch (e) {
		return false
	}

	if (props === 0) {
		return false
	}

	keys.forEach(function (key) {
		obj[key] = settings[key]
	})
	return obj
}

var saveSettings = function (options) {
	var settings = {}
		, keys = ['http', 'https', 'same']
	console.log('Saving settings...')

	keys.forEach(function (key) {
		settings[key] = options[key]
	})
	console.log('settings=', JSON.stringify(settings))

	fs.writeFile('./settings.json', JSON.stringify(settings), function (err) {
		if (err) {
			console.log('Warning: Cannot write settings to settings.json')
		} else {
			console.log('Settings saved successfuly')
		}
	})
}

program
  .version(pkg.version)
  .description(pkg.description)

program
	.command('setup')
	.description('setup configuration for developing behind the proxy')
  .option('--http <url>', 'set url for http proxy (e.g. http://myproxy.com:8080)', urlValidator)
  .option('--https <url>', 'set url for https proxy (e.g. https://me:mypass@myproxy.com:443', urlValidator)
  .option('--same', 'use the same http proxy for https')
  .option('--save', 'save settings')
	.action(function (options) {
		console.log('http=', options.http)
		console.log('https=', options.https)
		console.log('same=', options.same)
		console.log('save=', options.save)

		if (options.http === false) {
			console.log('Error: Bad http proxy url defined')
			this.outputHelp()
			process.exit(1)
		}

		if (options.https === false) {
			console.log('Error: Bad https proxy url defined')
			this.outputHelp()
			process.exit(1)
		}

		if (options.save === true && options.http === undefined && options.https === undefined) {
			console.log('Error: Cannot save without http or https definition')
			this.outputHelp()
			process.exit(2)
		}

		if (options.http === undefined && options.https === undefined) {
			var opts = loadSettings()
			if (opts === false) {
				console.log('Error: No configuration saved previously')
				this.outputHelp()
				process.exit(3)
			}
			console.log('Options loaded:', opts)
		} else if(options.save) {
			saveSettings(options)
		}

		if (options.same === true) {
			if (options.http !== undefined && options.https === undefined) {
				options.https = options.http
			} else {
				console.log('Error: Cannot use the same http proxy for https if http is not defined')
				this.outputHelp()
				process.exit(4)
			}
		}

		options.home = process.env.HOME
		console.log('HOME=', options.home)

		// TODO: setup
	})

program
  .command('clear')
  .description('clear configuration for developing behind the proxy')
	.action(function () {
		console.log('Clearing...')
		// TODO: clear
	})

program.parse(process.argv)

if (!program.args.length) {
	program.help()
	process.exit()
}