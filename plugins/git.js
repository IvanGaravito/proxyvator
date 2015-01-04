var name = module.exports.name = 'git'
	, exec = require('child_process').exec
module.exports.clear = function () {
	console.log(name + '::clear')
	try {
		exec('git config --global --unset http.proxy')
		exec('git config --global --unset https.proxy')
	} catch (e) {
	}
}

module.exports.setup = function (options) {
	console.log(name + '::setup')
	try {
		exec('git config --global http.proxy ' + options.http)
		if (options.https) {
			exec('git config --global https.proxy ' + options.https)
		}
	} catch (e) {
	}
}