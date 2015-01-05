var name = module.exports.name = 'bower'
	, fs = require('fs')

module.exports.clear = function (options) {
	console.log(name + '::clear')

	var file = options.home + '/.bowerrc'
	try {
		fs.readFile(file, function (err, buffer) {
			if (err) {
				console.log('[' + name + '] File "' + file + '" not found.')
				return
			}

			var settings = JSON.parse(buffer.toString())
			if (settings.hasOwnProperty('proxy')) {
				delete settings['proxy']
			}
			if (settings.hasOwnProperty('https-proxy')) {
				delete settings['https-proxy']
			}

			fs.writeFile(file, JSON.stringify(settings), function (err) {
				if (err) {
					console.log('[' + name + '] Cannot write to file "' + file + '".')
				}
			})
		})
	} catch (e) {
	}
}

module.exports.setup = function (options) {
	console.log(name + '::setup')

	var file = options.home + '/.bowerrc'
	try {
		fs.readFile(file, function (err, buffer) {
			if (err) {
				console.log('[' + name + '] File "' + file + '" not found.')
				return
			}

			var settings = JSON.parse(buffer.toString())
			settings.proxy = options.http
			if (options.https) {
				settings['https-proxy'] = options.https
			}

			fs.writeFile(file, JSON.stringify(settings), function (err) {
				if (err) {
					console.log('[' + name + '] Cannot write to file "' + file + '".')
				}
			})
		})
	} catch (e) {
	}
}