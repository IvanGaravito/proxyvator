var program = require('commander')

var pkg = require('./package.json')
	, common = require('./common.js')

program
  .version(pkg.version)
  .description(pkg.description)

program
  .option('--debug', 'output debbuging messages')

program
	.command('setup')
	.description('setup configuration for developing behind the proxy')
  .option('--http <url>', 'set url for http proxy (e.g. http://myproxy.com:8080)', common.urlValidator)
  .option('--https <url>', 'set url for https proxy (e.g. https://me:mypass@myproxy.com:443', common.urlValidator)
  .option('--same', 'use the same http proxy for https')
  .option('--save', 'save settings')
	.action(function (options) {
		var self = this

		common.setHelpFn(function () {
			self.outputHelp()
		})
		common.setDebug(options.parent.debug)

		if (options.http === false) common.error(1, 'Bad http proxy url defined')
		if (options.https === false) common.error(1, 'Bad https proxy url defined')

		if (options.save === true && options.http === undefined && options.https === undefined) common.error(2, 'Cannot save without http or https definition')
		if (options.http === undefined && options.https === undefined) {
			var opts = common.loadSettings()
			if (opts === false) common.error(3, 'No configuration saved previously')
			common.debug('Options loaded:', opts)
		} else if(options.save) {
			common.saveSettings(options)
		}

		if (options.same === true) {
			if (options.http !== undefined && options.https === undefined) {
				options.https = options.http
			} else {
				common.error(4, 'Cannot use the same http proxy for https if http is not defined')
			}
		}

		options.home = process.env.HOME
		common.debug('HOME=', options.home)

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