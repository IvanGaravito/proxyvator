var name = module.exports.name = 'git'
	, exec = require('child_process').exec

var handler = function (error) {
	if (error !== null) {
		if (error.message.match(/git --help/) !== null) {
			console.log('[' + name + '] Returned error code ' + error.code + ': ' + error.message)
		} else if (error.code === 1) {
			console.log('[' + name + '] Seems git is not installed or not accesible.')
		}
	}
}

module.exports.clear = function () {
	console.log(name + '::clear')
	try {
		exec('git config --global --unset http.proxy', handler)
		exec('git config --global --unset https.proxy', handler)
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