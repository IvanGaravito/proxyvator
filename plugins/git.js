var name = module.exports.name = 'git'
	, exec = require('child_process').exec
	, fs = require('fs')
	, os = require('os')
	, path = require('path')

var handler, handlerHttp, handlerHttps, handlerFile, file

handler = function (error) {
	if (error !== null) {
		if (error.message.match(/git --help/) !== null) {
			console.log('[' + name + '] Returned error code ' + error.code + ': ' + error.message)
		} else if (error.code === 1) {
			console.log('[' + name + '] Seems git is not installed or not accesible.')
		}
	}
}

handlerHttp = function (error) {
	handler(error)
	exec('git config --global --unset https.proxy', handlerHttps)
}

handlerHttps = function (error) {
	handler(error)
	handlerFile()
}

handlerFile = function () {	
	fs.readFile(file, function (err, buffer) {
		if (err) {
			console.log('[' + name + '] File "' + file + '" not found.')
			return
		}

		var data = buffer.toString()
		data = data.replace('[http]', '')
		data = data.replace('[https]', '')
		data = data.replace(os.EOL + os.EOL, '')

		fs.writeFile(file, data, function (err) {
			if (err) {
				console.log('[' + name + '] Cannot write to file "' + file + '".')
			}
		})
	})
}

module.exports.clear = function (options) {
	console.log(name + '::clear')

	file = path.join(options.home, '.gitconfig')
	try {
		exec('git config --global --unset http.proxy', handlerHttp)
	} catch (e) {
	}
}

module.exports.setup = function (options) {
	console.log(name + '::setup')
	try {
		exec('git config --global http.proxy ' + options.http, handler)
		if (options.https) {
			exec('git config --global https.proxy ' + options.https, handler)
		}
	} catch (e) {
	}
}