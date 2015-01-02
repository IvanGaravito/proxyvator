var program = require('commander')
	, pkg = require('./package.json')
	, url = require('url')

var urlFixer = function (theUrl) {
	var urlObj = url.parse(theUrl)
		, obj = {}
		, keys = ['protocol', 'slashes', 'auth', 'hostname']
		, str

	keys.forEach(function (key) {
		obj[key] = urlObj[key]
	})

	if (obj.protocol === undefined || obj.hostname === undefined) {
		return false
	}

	obj.port = urlObj.port? urlObj.port: 8080
	str = url.format(obj)
	if (str === '') {
		return false
	}

	// TODO: validate str as a url
	return str
}

program
  .version(pkg.version)
  .description(pkg.description)

program
	.command('setup')
	.description('setup configuration for developing behind the proxy')
  .option('--http <url>', 'set url for http proxy (e.g. http://myproxy.com:8080)', urlFixer)
  .option('--https <url>', 'set url for https proxy (e.g. https://me:mypass@myproxy.com:443', urlFixer)
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
			// TODO: loadSettings
			console.log('Loading settings...')
		} else if(options.save) {
			// TODO: saveSettings
			console.log('Saving settings...')
		}

		if (options.same) {
			if (options.http && options.https === undefined) {
				options.https = options.http
			} else {
				console.log('Error: Cannot use the same http proxy for https if http is not defined')
				this.outputHelp()
				process.exit(3)
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