var name = module.exports.name = 'npm'
	, fs = require('fs')
	, os = require('os')

module.exports.clear = function (options) {
	console.log(name + '::clear')

	var file = options.home + '/.npmrc'
	try {
		fs.readFile(file, function (err, buffer) {
			if (err) {
				console.log('[' + name + '] File "' + file + '" not found.')
				return
			}
			var data = buffer.toString()
			data = data.replace(/^proxy=http.+$/m, '')
			data = data.replace(/^https-proxy=http.+$/m, '')
			data = data.replace(os.EOL + os.EOL, '')
			fs.writeFile(file, data, function (err) {
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

	var file = options.home + '/.npmrc'
	try {
		fs.readFile(file, function (err, buffer) {
			if (err) {
				console.log('[' + name + '] File "' + file + '" not found.')
				return
			}
			var data = buffer.toString()
			data = data.replace(/^proxy=http.+$/m, '')
			data = data.replace(/^https-proxy=http.+$/m, '')
			data = data.replace(os.EOL + os.EOL, '')
			if (data.match(/(\n|\r\n|\r)$/) === null) {
				data = data + os.EOL
			}
			data = data + 'proxy=' + options.http + os.EOL
			if (options.https) {
				data = data + 'https-proxy=' + options.https
			}
			fs.writeFile(file, data, function (err) {
				if (err) {
					console.log('[' + name + '] Cannot write to file "' + file + '".')
				}
			})
		})
	} catch (e) {
	}
}