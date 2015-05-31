var fs = require('fs')
  , path = require('path')
  , common = require('./common')

// Global options
var options

// Internal functions
var exec, find, init, show

// Interface methods
var clear, list, setup


exec = function (pluginName, methodName) {
  var plugin, pluginPath

  pluginPath = options.pluginPath
  plugin = require(path.join(pluginPath, pluginName))
  console.log('Calling ' + pluginName + '::' + methodName + '...')
  plugin[methodName](options)
}

find = function (callback) {
  var pluginPath

  pluginPath = options.pluginPath
  callback = callback || show
  fs.readdir(pluginPath, function (err, files) {
    if (!err) {
      var plugins
      plugins = files.filter(function (f) {
        return /^proxyvator[-]/.test(f)
      })
      callback(plugins)
    }
  })
}

init = function (opts) {
  options = opts || {}
  options.pluginPath = options.pluginPath || path.dirname(__dirname)
}

show = function (plugins) {
  console.log('Plugin list')
  console.log('-----------\n')
  plugins.forEach(function (plugin) {
    console.log('*', plugin)
  })
  console.log('\n')
}

exports.clear = function (options) {
  init(options)
  find(function (plugins) {
    plugins.forEach(function (plugin) {
      exec(plugin, 'clear')
    })
  })
}

exports.list = function (options) {
  init(options)
  find()
}

exports.setup = function (options) {
  init(options)
  find(function (plugins) {
    plugins.forEach(function (plugin) {
      exec(plugin, 'setup')
    })
  })
}
