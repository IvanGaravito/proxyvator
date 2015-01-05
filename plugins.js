var fs = require('fs')
	, plugins = []

var loadPlugins = function (options, methodName) {
	console.log('Loading plugins...')
	fs.readdir('./plugins', function (err, files) {
		if (!err) {
			var plugins = files.filter(function (v) {
				return v !== '.' && v !== '..'
			})
			plugins.forEach(function (pluginFile) {
				var plugin = require('./plugins/' + pluginFile)
				console.log('Plugin ' + plugin.name + ' loaded. Calling ' + methodName + ' for this plugin...')
				plugin[methodName](options)
			})
		}
	})
}

module.exports.clear = function (options) {
	loadPlugins(options, 'clear')
}

module.exports.setup = function (options) {
	loadPlugins(options, 'setup')
}