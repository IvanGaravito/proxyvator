var fs = require('fs')
	, path = require('path')

var debugMode = false
	, each = Array.prototype.forEach
	, helpFn

module.exports.debug = function () {
	if (debugMode === false) return

	var args = ['Debug:']
	each.call(arguments, function (arg) {
		args.push(arg)
	})
	console.log.apply(console, args)
}

module.exports.error = function (errno, msg) {
	console.log('Error: ' + msg)
	if (helpFn) helpFn()
	process.exit(errno)
}

module.exports.loadSettings = function (options) {
	var settings = {}
		, keys = ['http', 'https', 'same']
		, obj = {}
		, props
	console.log('Loading settings...')

	try {
		settings = fs.readFileSync(path.join(__dirname, 'settings.json'))
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
		if (options !== undefined) options[key] = settings[key]
	})
	return obj
}

module.exports.saveSettings = function (options) {
	var settings = {}
		, keys = ['http', 'https', 'same']
	console.log('Saving settings...')

	keys.forEach(function (key) {
		settings[key] = options[key]
	})
	module.exports.debug('settings=', JSON.stringify(settings))

	fs.writeFile(path.join(__dirname, 'settings.json'), JSON.stringify(settings), function (err) {
		if (err) {
			console.log('Warning: Cannot write settings to settings.json')
		} else {
			console.log('Settings saved successfuly')
		}
	})
}

module.exports.setDebug = function (debug) {
	debugMode = !!debug
}

module.exports.setHelpFn = function (fn) {
	helpFn = fn
}

module.exports.urlValidator = function (theUrl) {
	var reUrl = /^https?:\/\/(?:(\w+)(?:[:](\w+))?[@])?([A-Za-z0-9-]+(?:[.][A-Za-z0-9-]+)*|(\d{1,3}(?:[.]\d{1,3}){3}))[:](\d+)$/
	return reUrl.exec(theUrl) === null? false: theUrl
}